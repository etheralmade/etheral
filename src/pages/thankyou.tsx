import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';

const ThankyouPage = (props: PageProps) => {
    console.log(props);

    return (
        <Layout>
            <h2>Hi thank you for your order!</h2>
        </Layout>
    );
};

export default ThankyouPage;
