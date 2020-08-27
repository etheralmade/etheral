import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { Navigation as NavigationEl } from './nav';

const Navigation = () => {
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    // overcome firebase.auth is not a function...
    useEffect(() => {
        setAuth(firebase.auth());
        setDb(firebase.firestore());
    }, []);

    return auth && db ? <NavigationEl auth={auth} db={db} /> : <></>;
};

export default Navigation;
