const { set, flatten } = require('lodash');
const path = require('path');
const fetch = require('node-fetch');
const { get } = require('lodash');

require('dotenv').config();

global.XMLHttpRequest = require('xhr2');

// init firebase to access firestore.
const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/storage');

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_FIREBASE_APP_ID,
});

// helper function to  create slugs
const nameToSlug = name =>
    name
        .toLowerCase()
        .split(' ')
        .join('-');

// overpass the runtime error.
exports.modifyBabelrc = ({ babelrc }) => ({
    ...babelrc,
    plugins: babelrc.plugins.concat([
        'transform-regenerator',
        'transform-runtime',
    ]),
});

// source nodes from firebase docs
exports.sourceNodes = async ({
    actions,
    createNodeId,
    createContentDigest,
}) => {
    const { createNode } = actions;

    const products = firebaseApp
        .firestore()
        .collection('fl_content')
        .where('_fl_meta_.schema', '==', 'product');
    const collections = firebaseApp
        .firestore()
        .collection('fl_content')
        .where('_fl_meta_.schema', '==', 'collection');
    const homepage = firebaseApp
        .firestore()
        .collection('fl_content')
        .where('_fl_meta_.schema', '==', 'homepage');
    const blogs = firebaseApp
        .firestore()
        .collection('fl_content')
        .where('_fl_meta_.schema', '==', 'blog');

    const storage = firebaseApp.storage();

    let collectionDocs = [];
    let productDocs = [];
    let blogDocs = [];
    let homepageDoc;

    await products.get().then(docs => {
        docs.forEach(doc => {
            if (doc.exists) {
                productDocs.push(doc.data());
            }
        });
    });

    await collections.get().then(docs => {
        docs.forEach(doc => {
            if (doc.exists) {
                collectionDocs.push(doc.data());
            }
        });
    });

    await homepage.get().then(docs => {
        if (docs.size > 0) {
            docs.forEach(doc => {
                homepageDoc = doc.data();
            });
        }
    });

    // get all blog posts.
    await blogs.get().then(docs => {
        docs.forEach(doc => {
            if (doc.exists) {
                blogDocs.push(doc.data());
            }
        });
    });

    // mapping all product docs and creating a node for each docs.
    const createNodesProducts = await productDocs.map(async data => {
        if (await data.image) {
            const reqImg = await Promise.all(
                data.image.map(async ref => {
                    try {
                        // get the filename from the referenced document.
                        const req = await ref.get();
                        const imgRef = await req.data().file;

                        // then get the download url from google cloud storage based on its filename
                        const imgDownloadUrl = await storage
                            .ref(`flamelink/media/${imgRef}`)
                            .getDownloadURL();

                        // return the url
                        return imgDownloadUrl;
                    } catch (err) {
                        console.error(err);
                        return '';
                    }
                })
            );
            await set(data, 'image', reqImg);
        }

        if (await data.collection) {
            // get the document then put the documents name into the data collection
            const reqCollection = await data.collection.get();
            const rspCollection = await reqCollection.data();

            await set(data, 'collection', rspCollection.name);
        }

        const noCollection = 'uncollection';

        const fields = await {
            name: data.name,
            pid: data.id,
            amount: data.amount,
            description: data.description,
            category: data.category,
            idrPrice: data.idrPrice,
            ausPrice: data.ausPrice,
            usdPrice: data.usdPrice,
            urls: data.image,
            availableSizes: data.availableSizes,
            collection: data.collection,
            weight: data.weight,
            slug: data.collection
                ? `${nameToSlug(data.collection)}/${nameToSlug(data.name)}`
                : `${noCollection}/${nameToSlug(data.name)}`,
        };

        return await createNode({
            // data for the node
            ...fields,
            id: createNodeId(fields.pid),
            internal: {
                type: 'Product',
                contentDigest: createContentDigest(fields),
            },
        });
    });

    const createNodesCollections = await collectionDocs.map(async data => {
        if (await data.collectionPromotionalImages) {
            const reqImg = await Promise.all(
                data.collectionPromotionalImages.map(async ref => {
                    try {
                        // get the filename from the referenced document.
                        const req = await ref.get();
                        const imgRef = await req.data().file;

                        // then get the download url from google cloud storage based on its filename
                        const imgDownloadUrl = await storage
                            .ref(`flamelink/media/${imgRef}`)
                            .getDownloadURL();

                        // return the url
                        return imgDownloadUrl;
                    } catch (err) {
                        console.error(err);
                        return '';
                    }
                })
            );
            await set(data, 'collectionPromotionalImages', reqImg);
        }

        const nodeFields = await {
            name: data.name,
            description: data.description,
            releaseDate: data.releaseDate,
            urls: data.collectionPromotionalImages,
            cid: data.id,
        };

        return await createNode({
            // data for the node
            ...nodeFields,
            id: createNodeId(nodeFields.cid),
            internal: {
                type: 'Collection',
                contentDigest: createContentDigest(nodeFields),
            },
        });
    });

    const createNodeHomepage = async () => {
        const campaigns = await Promise.all(
            homepageDoc.campaigns.campaign.map(async campaignItem => {
                const req = await campaignItem.image[0].get();
                const imgRef = await req.data().file;

                const imgDownloadUrl = await storage
                    .ref(`flamelink/media/${imgRef}`)
                    .getDownloadURL();

                const { campaignLink, campaignName } = campaignItem;

                return await {
                    campaignLink,
                    campaignName,
                    url: imgDownloadUrl,
                };
            })
        );

        const homepageImages = await Promise.all(
            homepageDoc.homepageImages.map(async homepageImg => {
                const req = await homepageImg.image[0].get();
                const imgRef = await req.data().file;

                const imgDownloadUrl = await storage
                    .ref(`flamelink/media/${imgRef}`)
                    .getDownloadURL();

                const { buttonLink, buttonText } = homepageImg;

                return await {
                    buttonLink,
                    buttonText,
                    url: imgDownloadUrl,
                };
            })
        );

        const getNavigationImage = async () => {
            const req = await homepageDoc.navigationImage[0].get();
            const imgRef = await req.data().file;

            const imgDownloadUrl = await storage
                .ref(`flamelink/media/${imgRef}`)
                .getDownloadURL();
            return await imgDownloadUrl;
        };

        const navigationImage = await getNavigationImage();

        const products = await Promise.all(
            homepageDoc.products.map(async productItem => {
                const req = await productItem.product
                    .get()
                    .then(product => product.data());
                return await req.id;
            })
        );

        const urls = await [
            ...campaigns.map(campaign => campaign.url),
            ...homepageImages.map(homepageImage => homepageImage.url),
            navigationImage,
        ];

        const nodeFields = await {
            campaigns,
            homepageImages,
            products,
            urls,
            navigationImage,
            homepageProductsDisplayText:
                homepageDoc.homepageProductsDisplayText,
        };

        return await createNode({
            // data for the node
            ...nodeFields,
            id: createNodeId('homepage'),
            internal: {
                type: 'Homepage',
                contentDigest: createContentDigest(nodeFields),
            },
        });
    };

    // map all blogs and create nodes fir each docs.
    const createNodesBlogs = await blogDocs.map(async data => {
        // blogImage
        if (await data.blogImage) {
            const ref = await data.blogImage[0];
            const req = await ref.get();
            const imgRef = await req.data().file;

            const imgDownloadUrl = await storage
                .ref(`flamelink/media/${imgRef}`)
                .getDownloadURL();
            await set(data, 'imgUrl', imgDownloadUrl);
        }
        // content
        // date
        // slug
        // summary
        // title

        const fields = await {
            content: data.content,
            date: data.date,
            slug: data.slug,
            summary: data.summary,
            title: data.title,
            image: data.image,
        };

        return await createNode({
            // data for the node
            ...fields,
            id: createNodeId(fields.title),
            internal: {
                type: 'Blog',
                contentDigest: createContentDigest(fields),
            },
        });
    });

    // get all cities from rajaongkir.com
    const requestCitiesCalculateShipping = async () => {
        try {
            const req = await fetch('https://api.rajaongkir.com/starter/city', {
                method: 'GET',
                headers: {
                    key: process.env.GATSBY_RAJA_ONGKIR_KEY,
                },
            });

            const res = await req.json();

            const results = await get(res, 'rajaongkir.results', []);
            const data = await results.map(resObject => ({
                name: resObject.city_name,
                provinceName: resObject.province,
                cityId: parseInt(resObject.city_id),
                provinceId: parseInt(resObject.province_id),
                postalCode: parseInt(resObject.postal_code),
            }));

            await data.map(dataItem =>
                createNode({
                    // data for the node
                    ...dataItem,
                    id: createNodeId(dataItem.postalCode),
                    internal: {
                        type: 'City',
                        contentDigest: createContentDigest(dataItem),
                    },
                })
            );
        } catch (e) {
            console.error(e);
        }
    };

    await Promise.all(
        flatten([
            createNodesProducts,
            createNodesCollections,
            requestCitiesCalculateShipping(),
            createNodeHomepage(),
            createNodesBlogs,
        ])
    );
};

// create pages based on properties from nodes sourced from firebase
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query {
            products: allProduct {
                edges {
                    node {
                        slug
                    }
                }
            }
            collections: allCollection {
                edges {
                    node {
                        name
                    }
                }
            }
            blogs: allBlog {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `);

    const { products, collections, blogs } = await result.data;

    // if (products) {
    await products.edges.forEach(({ node }) => {
        createPage({
            path: node.slug,
            component: path.resolve('./src/templates/products/index.tsx'),

            context: {
                slug: node.slug,
            },
        });
    });
    // }

    // if (collections) {
    await collections.edges.forEach(({ node }) => {
        createPage({
            path: nameToSlug(node.name),
            component: path.resolve('./src/templates/collections/index.tsx'),

            context: {
                name: node.name,
            },
        });
    });
    // }

    await blogs.edges.forEach(({ node }) => {
        createPage({
            path: `blogs/${node.slug}`,
            component: path.resolve('./src/templates/blogs/index.tsx'),
            context: {
                slug: node.slug,
            },
        });
    });
};
