import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Layout } from 'components/layout';
import Shop, { ShopType } from 'templates/shop';

import { Product } from 'helper/schema';

const BackInStockPage = ({ data }: PageProps) => {
    if (!data) {
        return null;
    }

    const { allProduct } = data as any;

    const products = allProduct.edges.map((edge: any) => edge.node);

    return (
        <Layout>
            <Shop
                products={products as Product[]}
                type={ShopType.BACK_IN_STOCK}
            />
        </Layout>
    );
};

export default BackInStockPage;

export const query = graphql`
    query {
        allProduct(filter: { onBackInStock: { eq: true } }) {
            edges {
                node {
                    amount
                    category
                    collection
                    description
                    gems {
                        gemSizes
                        gemTypes
                        withGems
                    }
                    name
                    pid
                    prices {
                        ausPrice
                        discountPercentage
                        idrPrice
                    }
                    productDetails
                    relatedProducts
                    slug
                    urls
                    weight
                }
            }
        }
    }
`;
