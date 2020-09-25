import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';

import firebase from 'gatsby-plugin-firebase';

const Logout = (props: PageProps) => {
    const auth = firebase.auth();

    return (
        <Layout>
            <div className="content">
                <h1>User: {auth.currentUser?.displayName}</h1>
                <button onClick={() => auth.signOut()}>Logout</button>
            </div>
        </Layout>
    );
};

export default Logout;
