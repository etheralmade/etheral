import React from 'react';
import { PageProps } from 'gatsby';

import { Layout } from 'components/layout';
import Checkout from 'components/checkout';

const CheckoutPage = (props: PageProps) => {
    return (
        <Layout>
            <Checkout />
        </Layout>
    );
};

export default CheckoutPage;
