// initialize firebase

require('dotenv').config();
const admin = require('firebase-admin');

const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

const config = {
    credential: admin.credential.cert({
        client_email: FIREBASE_CLIENT_EMAIL,
        private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        project_id: 'etheral-dev-f86af',
    }),
    databaseURL: 'https://etheral-dev-f86af.firebaseio.com',
};

if (!admin.apps.length) {
    admin.initializeApp(config);
}

const db = admin.firestore();

export { db };
