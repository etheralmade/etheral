import React from 'react';
import { Layout } from 'components/layout';
import { SEO } from 'components/seo';
import Auth from 'components/auth';

const AuthPage = () => {
    return (
        <Layout>
            <SEO title="Etheral | Log in to continue" />
            <div className="content">
                <Auth />
            </div>
        </Layout>
    );
};

export default AuthPage;
