import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';
import Auth from 'components/auth';

const AuthPage = (props: PageProps) => {
    return (
        <Layout>
            <div className="content">
                <Auth />
            </div>
        </Layout>
    );
};

export default AuthPage;
