import React from 'react';
import { findIndex } from 'lodash';

import { FluidObject, FixedObject } from 'gatsby-image';

import { Props as InitialProps } from '.';
import { FluidData, FixedData } from 'pages';
import Hero from './hero';
import Campaign from './campaign';

type Props = InitialProps & {
    db: firebase.firestore.Firestore;
};

const extractImagesFromUrl = (
    dataArr: any,
    imgVault: FluidData[] | FixedData[]
) =>
    dataArr
        .map((data: any) => {
            const index = findIndex(
                imgVault as any,
                (o: any) => o.url === data.url
            );
            if (index !== -1) {
                return imgVault[index];
            } else {
                return '';
            }
        })
        .filter((fluidData: any) => fluidData !== '');

const Homepage: React.FC<Props> = ({
    homepageData,
    heroImages,
    campaignImages,
    db,
}) => {
    // query on index.ts => maxWidth: 600, 1040, 1920
    const { homepageImages, campaigns } = homepageData;

    // extract hero data

    // image list should be on the same order
    const heroImgS = extractImagesFromUrl(homepageImages, heroImages.imgS);
    const heroImgM = extractImagesFromUrl(homepageImages, heroImages.imgM);
    const heroImgL = extractImagesFromUrl(homepageImages, heroImages.imgL);

    const heroData = homepageImages.map((homepageImg, index) => ({
        ...homepageImg,
        img: {
            sources: [
                {
                    ...heroImgS[index].childImageSharp.fluid,
                    media: '(max-width: 600px)',
                } as FluidObject,
                {
                    ...heroImgM[index].childImageSharp.fluid,
                    media: '(max-width: 1040px)',
                } as FluidObject,
                {
                    ...heroImgL[index].childImageSharp.fluid,
                    media: '(max-width: 1920px)',
                } as FluidObject,
            ],
        },
    }));

    // extract campaigns data
    const campaignImgS = extractImagesFromUrl(campaigns, campaignImages.imgS);
    const campaignImgM = extractImagesFromUrl(campaigns, campaignImages.imgM);
    const campaignImgL = extractImagesFromUrl(campaigns, campaignImages.imgL);
    const campaignData = campaigns.map((campaign, index) => ({
        ...campaign,
        img: {
            sources: [
                {
                    ...campaignImgS[index].childImageSharp.fixed,
                    media: '(max-width: 420px)',
                } as FixedObject,
                {
                    ...campaignImgM[index].childImageSharp.fixed,
                    media: '(max-width: 1040px)',
                } as FixedObject,
                {
                    ...campaignImgL[index].childImageSharp.fixed,
                    media: '(max-width: 1920px)',
                } as FixedObject,
            ],
        },
    }));

    // extract products to show on homepage

    // extract mailing-list image

    return (
        <>
            <h1>This is homepage!</h1>
            <Hero heroData={heroData} />
            <Campaign campaignData={campaignData} />
        </>
    );
};

export { Homepage };
