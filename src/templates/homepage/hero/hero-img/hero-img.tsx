import React from 'react';
import Img from 'gatsby-image';
import { Link } from '@reach/router';

import { Flex, Box, Button } from 'rebass';

import { HeroData } from '..';

type Props = HeroData;

const HeroImage: React.FC<Props> = ({ img, buttonLink, buttonText }) => {
    return (
        <Flex
            height="100%"
            width="100%"
            alignItems="flex-end"
            justifyContent="center"
            sx={{ position: 'relative' }}
        >
            <Box
                height="100%"
                width="100%"
                sx={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            >
                <Img
                    style={{ height: '100%', width: '100%' }}
                    imgStyle={{ objectPosition: 'center' }}
                    fluid={img.sources}
                />
            </Box>
            <Link to={buttonLink}>
                <Button mb={[8, 8, 9]} px={[8]}>
                    {buttonText}
                </Button>
            </Link>
        </Flex>
    );
};

export { HeroImage };
