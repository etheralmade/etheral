const siteTitle = 'Etheral';
const siteDescription =
    'Handcrafted fine jewelry and made to last. Shop our new arrivals and best sellers. Every piece from Etheral is something exclusively made for you, with no other person in the world having the same jewelry as yours.';
const siteAuthor = '@louisandrew';
const siteUrl = 'https://gatsby-starter-typescript-deluxe.netlify.com';
const siteImage = `${siteUrl}/icons/icon_512x512.png`;
const siteKeywords = [
    'Etheral',
    'Etheralmade',
    'Etheral Made',
    'Etheral Jewelry',
    'Jewelry, Earrings',
    'Necklace',
    'Rings',
    'Bracelet',
    'Silver jewelry',
    'Gold plated jewelry',
    'Bali jewelry',
    'Handmade jewelry',
];

const path = require('path');
// provide firebase on ssr.
require('dotenv').config();

module.exports = {
    proxy: [
        {
            prefix: '/starter',
            url: 'https://api.rajaongkir.com',
        },
        { prefix: '/get-shipping-cost', url: 'http://localhost:9000' },
        { prefix: '/payment', url: 'http://localhost:9000' },
        { prefix: '/send-email', url: 'http://localhost:9000' },
        { prefix: '/verify-order', url: 'http://localhost:9000' },
        { prefix: '/subscribe-mailing-list', url: 'http://localhost:9000' },
    ],
    siteMetadata: {
        title: siteTitle,
        description: siteDescription,
        author: siteAuthor,
        url: siteUrl,
        keywords: siteKeywords,
        image: siteImage,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'Product',
                // Making this plural (optional).
                name: 'productImages',
                // Path to the leaf node.
                imagePath: 'urls',
                // Set type to array.
                type: 'array',
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'Collection',
                // Making this plural (optional).
                name: 'collectionImages',
                // Path to the leaf node.
                imagePath: 'urls',
                // Set type to array.
                type: 'array',
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'Homepage',
                // Making this plural (optional).
                name: 'imgs',
                // Path to the leaf node.
                imagePath: 'urls',
                type: 'array',
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'About',
                // Making this plural (optional).
                name: 'imgs',
                // Path to the leaf node.
                imagePath: 'urls',
                // Set type to array.
                type: 'array',
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'Blog',
                // Making this plural (optional).
                name: 'image',
                // Path to the leaf node.
                imagePath: 'url',
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
                name: 'images',
            },
        },
        {
            resolve: `gatsby-plugin-portal`,
            options: {
                key: 'portal',
                id: 'portal',
            },
        },
        {
            resolve: 'gatsby-plugin-react-axe',
            options: {
                showInProduction: false,
                // Options to pass to axe-core.
                // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
                axeOptions: {
                    // Your axe-core options.
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-sharp`,
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: siteTitle,
                short_name: siteTitle,
                description: siteDescription,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: 'src/images/icon.png',
                icons: [
                    {
                        src: 'icons/icon_512x512.png',
                        sizes: '512x512',
                        types: 'image/png',
                    },
                    {
                        src: 'icons/icon_192x192.png',
                        sizes: '192x192',
                        types: 'image/png',
                    },
                ],
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-react-redux`,
            options: {
                pathToCreateStoreModule: './src/state/createStore.ts',
                serialize: {
                    space: 0,
                    isJSON: true,
                    unsafe: false,
                },
                cleanupOnClient: true,
                windowKey: '__PRELOADED_STATE__',
            },
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                components: path.join(__dirname, 'src/components'),
                helper: path.join(__dirname, 'src/helper'),
                pages: path.join(__dirname, 'src/pages'),
                state: path.join(__dirname, 'src/state'),
                styles: path.join(__dirname, 'src/styles'),
                lib: path.join(__dirname, 'src/lib'),
                templates: path.join(__dirname, 'src/templates'),
            },
        },
        {
            resolve: 'gatsby-plugin-firebase',
            options: {
                credentials: {
                    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
                    authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
                    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
                    storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
                    messagingSenderId:
                        process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
                    appId: process.env.GATSBY_FIREBASE_APP_ID,
                },
            },
        },
    ],
};
