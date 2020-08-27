import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Auth as AuthEl } from './auth';

const Auth = () => {
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );
    const [authPersistence, setAuthPersistence] = useState('');

    // overcome firebase.auth is not a function...
    useEffect(() => {
        setAuth(firebase.auth());
        setDb(firebase.firestore());
        setAuthPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }, []);

    return auth && db && authPersistence ? (
        <AuthEl
            auth={auth}
            db={db}
            googleProvider={new firebase.auth.GoogleAuthProvider()}
            authPersistence={authPersistence}
        />
    ) : (
        <></>
    );
};

export default Auth;
