import React from 'react';

import { Layout } from 'components/layout';
import { SEO } from 'components/seo';
import Checkout from 'components/checkout';

const CheckoutPage = () => {
    return (
        <Layout>
            <SEO title="Etheral | Checkout page" />
            <Checkout />
        </Layout>
    );
};

export default CheckoutPage;
