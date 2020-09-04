import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
import Homepage from 'templates/homepage';

export type HomePageData = {
    campaigns: {
        url: string;
        campaignLink: string;
        campaignName: string;
    }[];
    homepageImages: {
        url: string;
        buttonLink: string;
        buttonText: string;
    }[];
    imgs: {
        absolutePath: string;
    }[];
    products: string[];
};

export type FluidData = {
    absolutePath: string;
    childImageSharp: {
        fluid: FluidObject | FluidObject[] | undefined;
    };
};

const App = (props: PageProps) => {
    // eslint-disable-next-line @typescript-eslint/tslint/config

    const { data } = props;
    const dataAsAny = data as any;

    const homepageData: HomePageData = dataAsAny.homepageData as HomePageData;
    const imgS: FluidData = dataAsAny.imgS.imgs;
    const imgM: FluidData = dataAsAny.imgM.imgs;
    const imgL: FluidData = dataAsAny.imgL.imgs;

    return (
        <Layout>
            <SEO />
            <Homepage
                homepageData={homepageData}
                imgS={imgS}
                imgM={imgM}
                imgL={imgL}
            />
        </Layout>
    );
};

export default App;

export const query = graphql`
    query {
        homepageData: homepage {
            campaigns {
                url
                campaignLink
                campaignName
            }
            homepageImages {
                url
                buttonLink
                buttonText
            }
            imgs {
                absolutePath
            }
            products
        }
        imgS: homepage {
            imgs {
                absolutePath
                childImageSharp {
                    fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgM: homepage {
            imgs {
                absolutePath
                childImageSharp {
                    fluid(maxWidth: 1040) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgL: homepage {
            imgs {
                absolutePath
                childImageSharp {
                    fluid(maxWidth: 1920) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`;
