import React, { useEffect, useState } from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';

import firebase from 'gatsby-plugin-firebase';

const Logout = (props: PageProps) => {
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

export default Logout;
