const { set } = require('lodash');
const path = require('path');
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

const nameToSlug = name =>
    name
        .toLowerCase()
        .split(' ')
        .join('-');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type Product implements Node {
            name: String
            pid: String
            amount: Int
            description: String
            category: String
            idrPrice: Int
            urls: [String]
            slug: String
            availableSizes: [String]
            collection: String
        }
    `);

    createTypes(`
        type Collection implements Node {
            name: String
            description: String
            releaseDate: Date
            urls: [String]
            cid: String
        }
    `);
};

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

    const storage = firebaseApp.storage();

    let productDocs = await [];
    let collectionDocs = await [];

    const productReq = await products.get().then(async docs => docs);
    await productReq.forEach(async doc => {
        // create node if doc does exists.
        try {
            if (doc.exists) {
                const data = doc.data();

                // data.image is an array reference to another document..
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

                // collection is also a reference
                if (await data.collection) {
                    // get the document then put the documents name into the data collection
                    const reqCollection = await data.collection.get();
                    const rspCollection = await reqCollection.data();

                    await set(data, 'collection', rspCollection.name);
                }

                // const nodeFieldImages =

                const noCollection = 'uncollection';

                const fields = await {
                    name: data.name,
                    pid: data.id,
                    amount: data.amount,
                    description: data.description,
                    category: data.category,
                    idrPrice: data.idrPrice,
                    urls: data.image,
                    availableSizes: data.availableSizes,
                    collection: data.collection,
                    slug: data.collection
                        ? `${nameToSlug(data.collection)}/${data.id}`
                        : `${noCollection}/${data.id}`,
                };

                productDocs = await [...productDocs, fields];
            }
        } catch (e) {
            console.log(e);
        } finally {
            if (productDocs.length === productReq.size) {
                console.log('aa');
                console.log(productDocs);
                productDocs.forEach(product => {
                    createNode({
                        // data for the node
                        ...product,
                        id: createNodeId(product.pid),
                        internal: {
                            type: 'Product',
                            contentDigest: createContentDigest(product),
                        },
                    });
                });
            }
        }
    });

    const collectionReq = await collections.get().then(docs => docs);
    await collectionReq.forEach(async doc => {
        try {
            const data = doc.data();
            if (data.collectionPromotionalImages) {
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

            const nodeFields = {
                name: data.name,
                description: data.description,
                releaseDate: data.releaseDate,
                urls: data.collectionPromotionalImages,
                cid: data.id,
            };

            collectionDocs = [...collectionDocs, nodeFields];
        } catch (e) {
            console.error(e);
        } finally {
            if (collectionDocs.length === collectionReq.size) {
                console.log('bb');
                console.log(collectionDocs);
                collectionDocs.forEach(collection => {
                    createNode({
                        // data for the node
                        ...collection,
                        id: createNodeId(collection.cid),
                        internal: {
                            type: 'Collection',
                            contentDigest: createContentDigest(collection),
                        },
                    });
                });
            }
        }
    });

    return;
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
        }
    `);

    const { products, collections } = await result.data;

    console.log(JSON.stringify(result.data));

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
};
