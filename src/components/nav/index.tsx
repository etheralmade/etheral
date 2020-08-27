import React from 'react';
import firebase from 'gatsby-plugin-firebase';
import { Navigation as NavigationEl } from './nav';

const Navigation = () => {
    const auth = firebase.auth();
    const db = firebase.firestore();

    return <NavigationEl auth={auth} db={db} />;
};

export default Navigation;
