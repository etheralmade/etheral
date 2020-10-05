import { useEffect, useState } from 'react';
import { findIndex } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';

import { Product } from './schema/product';

export type Data = {
    pid: string;
    img: FluidFixedUnion[];
};

type FluidFixedUnion = {
    childImageSharp: {
        fluid: FluidObject | FluidObject[];
        fixed: FixedObject | FixedObject[];
    };
    url: string;
};

const useAllProductImages = () => {
    const [imgXS, setImgXS] = useState<Data[]>([]);
    const [imgS, setImgS] = useState<Data[]>([]);
    const [imgM, setImgM] = useState<Data[]>([]);
    const [imgL, setImgL] = useState<Data[]>([]);
    const [imgXL, setImgXL] = useState<Data[]>([]);

    const data = useStaticQuery(graphql`
        query {
            imgXS: allProduct {
                edges {
                    node {
                        pid
                        productImages {
                            url
                            childImageSharp {
                                fixed(width: 120, height: 120, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                                fluid(
                                    maxWidth: 120
                                    maxHeight: 120
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid
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
                                fixed(width: 180, height: 180, quality: 100) {
                                    ...GatsbyImageSharpFixed
                                }
                                fluid(
                                    maxWidth: 180
                                    maxHeight: 180
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid
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
                                fluid(
                                    maxWidth: 310
                                    maxHeight: 310
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid
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
                                fluid(
                                    maxWidth: 430
                                    maxHeight: 430
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid
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
                                fluid(
                                    maxWidth: 440
                                    maxHeight: 440
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    useEffect(() => {
        const queryImgXS: Data[] = data.imgXS.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FluidFixedUnion,
        }));
        const queryImgS: Data[] = data.imgS.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FluidFixedUnion,
        }));
        const queryImgM: Data[] = data.imgM.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FluidFixedUnion,
        }));
        const queryImgL: Data[] = data.imgL.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FluidFixedUnion,
        }));
        const queryImgXL: Data[] = data.imgXL.edges.map((edge: any) => ({
            pid: edge.node.pid,
            img: edge.node.productImages as FluidFixedUnion,
        }));

        setImgXS(queryImgXS);
        setImgS(queryImgS);
        setImgM(queryImgM);
        setImgL(queryImgL);
        setImgXL(queryImgXL);
    }, []);

    const extractImgs = (product: Product, sources = false, fluid = false) => {
        const sourceBreakpoints = {
            s: '320px',
            m: '600px',
            l: '1440px',
            // xl: '1920px',
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

                if (fluid) {
                    return {
                        sources: [
                            productImgXS.img[index].childImageSharp.fluid,
                            {
                                ...productImgS.img[index].childImageSharp.fluid,
                                media: `(max-width: ${sourceBreakpoints.s})`,
                            } as FluidObject,
                            {
                                ...productImgM.img[index].childImageSharp.fluid,
                                media: `(max-width: ${sourceBreakpoints.m})`,
                            } as FluidObject,
                            {
                                ...productImgL.img[index].childImageSharp.fluid,
                                media: `(max-width: ${sourceBreakpoints.l})`,
                            } as FluidObject,
                            {
                                ...productImgXL.img[index].childImageSharp
                                    .fluid,
                                media: `(min-width: ${sourceBreakpoints.l})`,
                            } as FluidObject,
                        ],
                    };
                } else {
                    return {
                        sources: [
                            productImgXS.img[index].childImageSharp.fixed,
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
                                ...productImgXL.img[index].childImageSharp
                                    .fixed,
                                media: `(min-width: ${sourceBreakpoints.l})`,
                            } as FixedObject,
                        ],
                    };
                }
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
