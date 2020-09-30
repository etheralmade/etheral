import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Layout } from 'components/layout';

const UserPage = () => {
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);

    useEffect(() => {
        setAuth(firebase.auth());
    }, []);

    return auth ? (
        <Layout>
            <div className="content">
                <h1>User: {auth.currentUser?.displayName}</h1>
                <button onClick={() => auth.signOut()}>Logout</button>
            </div>
        </Layout>
    ) : null;
};

export default UserPage;
