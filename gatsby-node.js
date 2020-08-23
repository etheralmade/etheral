const { set } = require('lodash');
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

exports.modifyBabelrc = ({ babelrc }) => ({
    ...babelrc,
    plugins: babelrc.plugins.concat([
        'transform-regenerator',
        'transform-runtime',
    ]),
});

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
            image: [String]
            slug: String
            availableSizes: [String]
            collection: String
        }
    `);

    createTypes(`
        type Collection implements Node {
            name: String,
            description: String,
            releaseDate: Int,
            collectionPromotionalImages: [String],
            cid: String,
        }
    `);
};

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

    await products.get().then(docs => {
        // create pages for all product docs!

        docs.forEach(async doc => {
            // create node if doc does exists.
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

                const noCollection = 'uncollection';

                const nodeFields = {
                    name: data.name,
                    pid: data.id,
                    amount: data.amount,
                    description: data.description,
                    category: data.category,
                    idrPrice: data.idrPrice,
                    image: data.image,
                    availableSizes: data.availables,
                    collection: data.collection,
                    slug: data.collection
                        ? `${data.collection}/${data.id}`
                        : `${noCollection}/${data.id}`,
                };

                createNode({
                    // data for the node
                    ...nodeFields,
                    id: createNodeId(data.id),
                    internal: {
                        type: 'Product',
                        contentDigest: createContentDigest(nodeFields),
                    },
                });
            }
        });
    });

    await collections.get().then(docs => {
        docs.forEach(async doc => {
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
                collectionPromotionalImages: data.collectionPromotionalImages,
                cid: data.id,
            };

            createNode({
                // data for the node
                ...nodeFields,
                id: createNodeId(data.id),
                internal: {
                    type: 'Collection',
                    contentDigest: createContentDigest(nodeFields),
                },
            });
        });
    });

    return;
};
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
};
