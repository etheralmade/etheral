import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Product } from 'helper/schema/product';
import Products from './products';
import { Layout } from 'components/layout';

const ProductsTemplate = (props: PageProps) => {
    const { data } = props;

    console.log(data);

    const productData: Product = (data as any).product as Product;

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
            amount
            availableSizes
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
            productImages {
                absolutePath
                childImageSharp {
                    fixed {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    }
`;
