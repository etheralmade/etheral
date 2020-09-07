import { useEffect, useState } from 'react';
import { findIndex } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';

import { FixedData as FixedDataPages } from 'pages';
import { Product } from './schema/product';

export type FixedData = {
    pid: string;
    img: FixedDataPages[];
};

const useAllProductImages = () => {
    const [imgXS, setImgXS] = useState<FixedData[]>([]);
    const [imgS, setImgS] = useState<FixedData[]>([]);
    const [imgM, setImgM] = useState<FixedData[]>([]);
    const [imgL, setImgL] = useState<FixedData[]>([]);
    const [imgXL, setImgXL] = useState<FixedData[]>([]);

    const data = useStaticQuery(graphql`
        query {
            imgXS: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(width: 60, height: 60, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgS: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(width: 240, height: 240, quality: 100) {
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
                                fixed(height: 300, width: 300, quality: 100) {
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
                                fixed(height: 200, width: 200, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
            imgXL: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(height: 280, width: 280, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    useEffect(() => {
        const queryImgXS: FixedData[] = data.imgXS.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FixedDataPages[],
        }));
        const queryImgS: FixedData[] = data.imgS.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FixedDataPages[],
        }));
        const queryImgM: FixedData[] = data.imgM.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FixedDataPages[],
        }));
        const queryImgL: FixedData[] = data.imgL.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FixedDataPages[],
        }));
        const queryImgXL: FixedData[] = data.imgXL.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FixedDataPages[],
        }));

        setImgXS(queryImgXS);
        setImgS(queryImgS);
        setImgM(queryImgM);
        setImgL(queryImgL);
        setImgXL(queryImgXL);
    }, []);

    const extractImgs = (product: Product, sources = false) => {
        const sourceBreakpoints = {
            s: '320px',
            m: '600px',
            l: '1440px',
            xl: '1920px',
        };

        // extract images based on its pid(s)
        const productImgXS =
            imgXS[findIndex(imgXS, o => o.pid === product.pid)];
        const productImgS = imgS[findIndex(imgS, o => o.pid === product.pid)];
        const productImgM = imgM[findIndex(imgM, o => o.pid === product.pid)];
        const productImgL = imgL[findIndex(imgL, o => o.pid === product.pid)];
        const productImgXL =
            imgXL[findIndex(imgXL, o => o.pid === product.pid)];

        if (sources) {
            const imgs = product.urls.map(url => {
                const index = findIndex(productImgS.img, o => o.url === url);
                return {
                    sources: [
                        productImgXS,
                        {
                            ...productImgS.img[index].childImageSharp.fixed,
                            media: `(max-width: ${sourceBreakpoints.s})`,
                        } as FixedObject,
                        {
                            ...productImgM.img[index].childImageSharp.fixed,
                            media: `(max-width: ${sourceBreakpoints.m})`,
                        } as FixedObject,
                        {
                            ...productImgL.img[index].childImageSharp.fixed,
                            media: `(max-width: ${sourceBreakpoints.l})`,
                        } as FixedObject,
                        {
                            ...productImgXL.img[index].childImageSharp.fixed,
                            media: `(max-width: ${sourceBreakpoints.xl})`,
                        } as FixedObject,
                    ],
                };
            });
            return imgs;
        } else {
            return {
                xs: productImgXS,
                s: productImgS,
                m: productImgM,
                l: productImgL,
                xl: productImgXL,
            };
        }
    };

    return {
        xs: imgXS,
        s: imgS,
        m: imgM,
        l: imgM,
        xl: imgXL,
        extractImgs,
    };
};

export default useAllProductImages;
