import React from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Auth as AuthEl } from './auth';

const Auth = () => {
    const auth = firebase.auth();
    const db = firebase.firestore();

    return (
        <AuthEl
            auth={auth}
            db={db}
            googleProvider={new firebase.auth.GoogleAuthProvider()}
        />
    );
};

export default Auth;
