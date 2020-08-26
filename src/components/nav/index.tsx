import React from 'react';
import firebase from 'gatsby-plugin-firebase';
import { Navigation as NavigationEl } from './nav';

const Navigation = () => (
    <NavigationEl auth={firebase.auth()} db={firebase.firestore()} />
);

export default Navigation;
