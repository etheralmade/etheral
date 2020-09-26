import React from 'react';
import Img, { FluidObject } from 'gatsby-image';

import { Box, Flex, Text } from 'rebass';

type ImgSource = { sources: FluidObject[] };

type Props = {
    firstParagraph: string;
    secondParagraph: string;
    thirdParagraph: string;
    firstImg: ImgSource;
    secondImg: ImgSource;
    thirdImg: ImgSource;
};

const About: React.FC<Props> = ({
    firstParagraph,
    secondParagraph,
    thirdParagraph,
    firstImg,
    secondImg,
    thirdImg,
}) => {
    const articleStyling = {
        sx: {},
    };

    return (
        <Box className="content" as="article" sx={{ fontFamily: 'body' }}>
            <Flex as="section">
                <Text
                    dangerouslySetInnerHTML={{ __html: firstParagraph }}
                    lineHeight="8px"
                    width="50%"
                    {...articleStyling}
                />
                <Box width="50%">
                    <Img fluid={firstImg.sources} />
                </Box>
            </Flex>
            <Flex as="section">
                <Text
                    as="p"
                    dangerouslySetInnerHTML={{ __html: secondParagraph }}
                    {...articleStyling}
                />
                <Box width="50%">
                    <Img fluid={secondImg.sources} />
                </Box>
            </Flex>
            <Flex as="section">
                <Text
                    as="p"
                    dangerouslySetInnerHTML={{ __html: thirdParagraph }}
                    {...articleStyling}
                />
                <Box width="50%">
                    <Img fluid={thirdImg.sources} />
                </Box>
            </Flex>
        </Box>
    );
};

export { About };
