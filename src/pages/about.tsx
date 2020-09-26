import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { findIndex } from 'lodash';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import About from 'templates/about';

const AboutPage: React.FC<PageProps> = ({ data }) => {
    const {
        about,
        imgS: imgSQuery,
        imgM: imgMQuery,
        imgL: imgLQuery,
        imgXL: imgXLQuery,
    } = data as any;

    if (about) {
        const {
            firstParagraph,
            firstParagraphUrl,
            secondParagraph,
            secondParagraphUrl,
            thirdParagraph,
            thirdParagraphUrl,
        } = about;

        const getImgs = (
            url: string,
            first: boolean // additional identifier => extra query for first paragraph img
        ): { sources: FluidObject[] } => {
            // search for all imgs => safety if the query result is not in order
            const indexS = findIndex(imgSQuery.imgs, (o: any) => o.url === url);
            const indexM = findIndex(imgMQuery.imgs, (o: any) => o.url === url);
            const indexL = findIndex(imgLQuery.imgs, (o: any) => o.url === url);

            if (indexS !== -1) {
                const imgS = imgSQuery.imgs[indexS];
                const imgM = imgMQuery.imgs[indexM];
                const imgL = imgLQuery.imgs[indexL];

                if (!first) {
                    return {
                        sources: [
                            {
                                ...imgS.childImageSharp.fluid,
                                media: '(max-width: 400px)',
                            } as FluidObject,
                            {
                                ...imgM.childImageSharp.fluid,
                                media: '(max-width: 800px)',
                            } as FluidObject,
                            imgL.childImageSharp.fluid as FluidObject,
                        ],
                    };
                } else {
                    const indexXL = findIndex(
                        imgXLQuery.imgs,
                        (o: any) => o.url === url
                    );

                    return {
                        sources: [
                            {
                                ...imgS.childImageSharp.fluid,
                                media: '(max-width: 400px)',
                            } as FluidObject,
                            {
                                ...imgM.childImageSharp.fluid,
                                media: '(max-width: 800px)',
                            } as FluidObject,
                            {
                                ...imgL.childImageSharp.fluid,
                                media: '(max-width: 1440px)',
                            } as FluidObject,
                            imgXLQuery.imgs[indexXL].childImageSharp
                                .fluid as FluidObject,
                        ],
                    };
                }
            } else {
                return { sources: [] };
            }
        };

        return (
            <Layout>
                <SEO
                    title="About gatsby-starter-template-deluxe"
                    description="Examples using the gatsby-starter-template-deluxe."
                />
                <About
                    firstParagraph={firstParagraph}
                    secondParagraph={secondParagraph}
                    thirdParagraph={thirdParagraph}
                    firstImg={getImgs(firstParagraphUrl, true)}
                    secondImg={getImgs(secondParagraphUrl, false)}
                    thirdImg={getImgs(thirdParagraphUrl, false)}
                />
            </Layout>
        );
    } else {
        return null;
    }
};

export default AboutPage;

export const query = graphql`
    query {
        about: about {
            firstParagraph
            firstParagraphUrl
            secondParagraph
            secondParagraphUrl
            thirdParagraph
            thirdParagraphUrl
        }
        imgS: about {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgM: about {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgL: about {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 800, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgXL: about {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 1200, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`;
