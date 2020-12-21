import React from 'react';

import { Layout } from 'components/layout';
import { SEO } from 'components/seo';
import Shop, { ShopType } from 'templates/shop';

import useAllProducts from 'helper/use-all-products';

const ShopPage = () => {
    const allProducts = useAllProducts();

    return (
        <Layout>
            <SEO title="Etheral | Shop" />
            <Shop products={allProducts} type={ShopType.SHOP_ALL} />
        </Layout>
    );
};

export default ShopPage;
