import React from 'react';
import { findIndex } from 'lodash';

import { Props as InitialProps } from '.';
import { FluidData } from 'pages';
import Hero from './hero';

type Props = InitialProps & {
    db: firebase.firestore.Firestore;
};

const extractFluidFromUrl = (
    dataArr: any,
    imgVault: FluidData[]
): FluidData[] =>
    dataArr
        .map((data: any) => {
            const index = findIndex(imgVault, o => o.url === data.url);
            if (index !== -1) {
                return imgVault[index];
            } else {
                return '';
            }
        })
        .filter((fluidData: any) => fluidData !== '');

const Homepage: React.FC<Props> = ({ homepageData, imgS, imgM, imgL, db }) => {
    // query on index.ts => maxWidth: 600, 1040, 1920
    console.log(homepageData);

    const { homepageImages } = homepageData;

    // extract hero data

    // image list should be on the same order
    const heroImgS = extractFluidFromUrl(homepageImages, imgS);
    const heroImgM = extractFluidFromUrl(homepageImages, imgM);
    const heroImgL = extractFluidFromUrl(homepageImages, imgL);

    const heroData = homepageImages.map((homepageImg, index) => ({
        ...homepageImg,
        img: {
            sources: [
                {
                    ...heroImgS[index].childImageSharp.fluid,
                    media: '(max-width: 600px)',
                },
                {
                    ...heroImgM[index].childImageSharp.fluid,
                    media: '(max-width: 1040px)',
                },
                {
                    ...heroImgL[index].childImageSharp.fluid,
                    media: '(max-width: 1920px)',
                },
            ],
        },
    }));
    // const heroData: HeroProps = {};

    // extract campaigns data

    // extract products to show on homepage

    // extract mailing-list image

    return (
        <>
            <h1>This is homepage!</h1>
            <Hero heroData={heroData} />
        </>
    );
};

export { Homepage };
