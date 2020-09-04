import React from 'react';
import Img, { FluidObject, FixedObject } from 'gatsby-image';

import { Box, Flex, FlexProps, Heading } from 'rebass';

type Props = FlexProps & {
    url: string;
    imgAlt: string;
    img?: {
        sources: FluidObject | FluidObject[] | FixedObject | FixedObject[];
    };
    tileOnText?: string;
    imageIsFluid?: boolean;
};

const Tile: React.FC<Props> = ({
    img,
    tileOnText,
    url,
    imgAlt,
    imageIsFluid,
    css,
    ...rest
}) => {
    console.log(css); // css. rather than dealing with the overhead here, I just decided not to use the css props -> https://github.com/rebassjs/rebass/issues/664

    return (
        <Flex
            data-testid="tile-container"
            alignItems="center"
            justifyContent="center"
            sx={{ position: 'relative' }}
            {...rest}
        >
            <Box
                height="100%"
                width="100%"
                sx={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            >
                {img ? (
                    imageIsFluid ? (
                        <Img
                            fluid={img.sources as FluidObject | FluidObject[]}
                            alt={imgAlt}
                        />
                    ) : (
                        <Img
                            fixed={img.sources as FixedObject | FixedObject[]}
                            alt={imgAlt}
                        />
                    )
                ) : (
                    <img src={url} alt={imgAlt} />
                )}
            </Box>
            {tileOnText && (
                <Heading as="h3" variant="tileText">
                    {tileOnText}
                </Heading>
            )}
        </Flex>
    );
};

export { Tile };
