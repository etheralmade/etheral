import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';
import Auth from 'components/auth/auth';

const AuthPage = (props: PageProps) => {
    return (
        <Layout>
            <Auth />
        </Layout>
    );
};

export default AuthPage;
