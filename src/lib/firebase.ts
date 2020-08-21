import firebase from 'firebase/app';

// add aditional services -> auth, firestore

import firebaseConfig from './firebaseConfig';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
