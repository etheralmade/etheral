/* eslint-disable*/
const firebase = require('firebase');
const firebaseConfig = require('./firebase-config');

const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports.firebaseApp = firebaseApp;
