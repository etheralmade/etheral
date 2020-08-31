import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { Admin as AdminEl } from './admin';

const Admin = () => {
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    useEffect(() => {
        setDb(firebase.firestore());
    }, []);

    return db ? <AdminEl db={db} /> : <></>;
};

export default Admin;
