import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Product } from 'helper/schema/product';
import Products from './products';
import { Layout } from 'components/layout';

const ProductsTemplate = (props: PageProps) => {
    const { data } = props;
    const productData: Product = (data as any).product as Product;

    console.log(data);

    return (
        <Layout>
            <Products {...productData} />
        </Layout>
    );
};

export default ProductsTemplate;

export const query = graphql`
    query($slug: String) {
        product(slug: { eq: $slug }) {
            pid
            slug
            amount
            availableSizes
            category
            collection
            description
            idrPrice
            productImages {
                childImageSharp {
                    fixed {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            name
        }
    }
`;
