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

        const getImgs = (url: string): { sources: FluidObject[] } => {
            // search for all imgs => safety if the query result is not in order
            const indexS = findIndex(imgSQuery.imgs, (o: any) => o.url === url);
            const indexM = findIndex(imgMQuery.imgs, (o: any) => o.url === url);
            const indexL = findIndex(imgLQuery.imgs, (o: any) => o.url === url);

            if (indexS !== -1) {
                const imgS = imgSQuery.imgs[indexS];
                const imgM = imgMQuery.imgs[indexM];
                const imgL = imgLQuery.imgs[indexL];

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
                    firstImg={getImgs(firstParagraphUrl)}
                    secondImg={getImgs(secondParagraphUrl)}
                    thirdImg={getImgs(thirdParagraphUrl)}
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
                    fluid(maxWidth: 300, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgM: about {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgL: about {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`;
