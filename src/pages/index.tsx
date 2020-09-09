import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject, FixedObject } from 'gatsby-image';

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
    products: string[];
};

export type FluidData = {
    url: string;
    childImageSharp: {
        fluid: FluidObject | FluidObject[] | undefined;
    };
};

export type FixedData = {
    url: string;
    childImageSharp: {
        fixed: FixedObject | FixedObject[] | undefined;
    };
};

const App = (props: PageProps) => {
    // eslint-disable-next-line @typescript-eslint/tslint/config

    const { data } = props;
    const dataAsAny = data as any;

    const homepageData: HomePageData = dataAsAny.homepageData as HomePageData;
    const heroImgS: FluidData[] = dataAsAny.imgS.imgs;
    const heroImgM: FluidData[] = dataAsAny.imgM.imgs;
    const heroImgL: FluidData[] = dataAsAny.imgL.imgs;

    const campaignImgS: FixedData[] = dataAsAny.campaignImgS.imgs;
    const campaignImgM: FixedData[] = dataAsAny.campaignImgM.imgs;
    const campaignImgL: FixedData[] = dataAsAny.campaignImgL.imgs;
    const campaignImgXL: FixedData[] = dataAsAny.campaignImgXL.imgs;

    const heroImages = { imgS: heroImgS, imgM: heroImgM, imgL: heroImgL };
    const campaignImages = {
        imgS: campaignImgS,
        imgM: campaignImgM,
        imgL: campaignImgL,
        imgXL: campaignImgXL,
    };

    return (
        <Layout>
            <SEO />
            <Homepage
                homepageData={homepageData}
                heroImages={heroImages}
                campaignImages={campaignImages}
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
            products
        }
        imgS: homepage {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 600, maxHeight: 500, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgM: homepage {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 1040, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        imgL: homepage {
            imgs {
                url
                childImageSharp {
                    fluid(maxWidth: 1920, quality: 100) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        campaignImgS: homepage {
            imgs {
                url
                childImageSharp {
                    fixed(width: 375, height: 375, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
        campaignImgM: homepage {
            imgs {
                url
                childImageSharp {
                    fixed(width: 480, height: 480, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
        campaignImgL: homepage {
            imgs {
                url
                childImageSharp {
                    fixed(height: 640, width: 640, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
        campaignImgXL: homepage {
            imgs {
                url
                childImageSharp {
                    fixed(height: 1024, width: 1024, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    }
`;
