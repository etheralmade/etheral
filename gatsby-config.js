const siteTitle = 'gatsby-starter-typescript-deluxe';
const siteDescription =
    'A Gatsby starter with TypeScript, Storybook, Styled Components, Framer Motion, Jest, and more.';
const siteAuthor = '@gojutin';
const siteUrl = 'https://gatsby-starter-typescript-deluxe.netlify.com';
const siteImage = `${siteUrl}/icons/icon_512x512.png`;
const siteKeywords = ['gatsby', 'typescript', 'starter', 'javascript', 'react'];

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
        { prefix: '/payment-gateway', url: 'http://localhost:9000' },
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
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
                name: 'images',
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
        `gatsby-plugin-styled-components`,
        `gatsby-transformer-sharp`,
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
