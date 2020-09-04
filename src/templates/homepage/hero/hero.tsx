import React from 'react';
import Img, { FluidObject, FixedObject } from 'gatsby-image';

import { Box } from 'rebass';

export type Props = {
    heroData: {
        img: {
            sources: FluidObject | FluidObject[];
        };
        url: string;
        buttonLink: string;
        buttonText: string;
    }[];
};

const Hero: React.FC<Props> = ({ heroData }) => {
    console.log(heroData);

    return (
        <Box height="100vh" width="100vw">
            <Img fluid={heroData[0].img.sources} />
        </Box>
    );
};

export { Hero };
