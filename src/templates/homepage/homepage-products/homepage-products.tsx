import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { findIndex } from 'lodash';
import { FixedObject } from 'gatsby-image';
import { Link } from '@reach/router';

import { Flex, Box, Heading } from 'rebass';

import { Product } from 'helper/schema/product';
import { FixedData as FixedDataPages } from 'pages';
import ProductCard from 'components/product-card';

import './homepage.scss';

type Props = {
    products: Product[];
};

type FixedData = {
    pid: string;
    img: FixedDataPages[];
};

const HomepageProducts: React.FC<Props> = ({ products }) => {
    const data = useStaticQuery(graphql`
        query {
            imgS: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(width: 240, height: 240) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgM: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(height: 300, width: 300) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgL: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(height: 240, width: 240) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const imgS: FixedData[] = data.imgS.edges.map((edge: any) => ({
        pid: edge.node.pid,
        img: edge.node.productImages as FixedDataPages[],
    }));
    const imgM: FixedData[] = data.imgM.edges.map((edge: any) => ({
        pid: edge.node.pid,
        img: edge.node.productImages as FixedDataPages[],
    }));
    const imgL: FixedData[] = data.imgL.edges.map((edge: any) => ({
        pid: edge.node.pid,
        img: edge.node.productImages as FixedDataPages[],
    }));

    const extractImgs = (product: Product) => {
        // extract images based on its pid(s)
        const productImgS = imgS[findIndex(imgS, o => o.pid === product.pid)];
        const productImgM = imgM[findIndex(imgM, o => o.pid === product.pid)];
        const productImgL = imgL[findIndex(imgL, o => o.pid === product.pid)];

        const imgs = product.urls.map(url => {
            const index = findIndex(productImgS.img, o => o.url === url);
            return {
                sources: [
                    {
                        ...productImgS.img[index].childImageSharp.fixed,
                        media: '(max-width: 320px)',
                    } as FixedObject,
                    {
                        ...productImgM.img[index].childImageSharp.fixed,
                        media: '(max-width: 600px)',
                    } as FixedObject,
                    {
                        ...productImgL.img[index].childImageSharp.fixed,
                        media: '(max-width: 1920px)',
                    } as FixedObject,
                ],
            };
        });
        return imgs;
    };

    if (imgS && products[0]) {
        console.log(extractImgs(products[0]));
    }

    return (
        <Flex variant="outerWrapper">
            <Box variant="innerWrapper">
                <Heading
                    textAlign="center"
                    as="h2"
                    variant="h2"
                    mb={[5, 5, 6, 7]}
                >
                    New Arrivals
                </Heading>
                <Flex
                    flexDirection={['column', 'column', 'row']}
                    alignItems={['center', 'center']}
                    flexWrap="wrap"
                    justifyContent={['space-evenly']}
                >
                    {products.map(product => (
                        <Link
                            key={product.pid}
                            to={product.slug}
                            className="product-link"
                        >
                            <ProductCard
                                product={product}
                                imgs={extractImgs(product)}
                                mb={[7]}
                                width={['100%', '100%', 'fit-content']}
                            />
                        </Link>
                    ))}
                </Flex>
            </Box>
        </Flex>
    );
};

export { HomepageProducts };
