import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { set } from 'lodash';

import { Product } from 'helper/schema/product';
import Products from './products';
import { Layout } from 'components/layout';

const ProductsTemplate = (props: PageProps) => {
    const { data } = props;

    const productData: Product = (data as any).product as Product;

    // extract all img queries.
    const imgS = (data as any).imgS.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgM = (data as any).imgM.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgL = (data as any).imgL.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgXL = (data as any).imgXL.productImages.map(
        (pImg: any) => pImg.childImageSharp.fluid
    );

    const imgs = imgS.map((fluid: any, i) => {
        return {
            sources: [
                { ...fluid, media: '(max-width: 400px)' },
                { ...imgM[i], media: '(max-width: 768px)' },
                { ...imgL[i], media: '(max-width: 1024px)' },
                imgXL[i],
            ],
        };
    });

    set(productData, 'productImages', imgs);

    return (
        <Layout>
            <Products {...productData} />
        </Layout>
    );
};

export default ProductsTemplate;

export const query = graphql`
    query($slug: String) {
        product: product(slug: { eq: $slug }) {
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
        }
        imgS: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 280, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgM: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 320, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgL: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgXL: product(slug: { eq: $slug }) {
            productImages {
                childImageSharp {
                    fluid(maxWidth: 620, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`;
