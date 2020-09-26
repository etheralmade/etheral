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
        mt: [6, 6, 0],
        width: ['100%', '100%', '50%'],
        sx: {},
    };

    const sectionStyling = {
        px: [5, 5, 8],
        mb: [6, 6, 10],
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    return (
        <Box className="content" as="article" sx={{ fontFamily: 'body' }}>
            <Flex
                as="section"
                {...sectionStyling}
                flexDirection={['column-reverse', 'column-reverse', 'row']}
                py={[0, 0, 7, 8]}
            >
                <Text
                    dangerouslySetInnerHTML={{ __html: firstParagraph }}
                    {...articleStyling}
                    lineHeight="8px"
                    textAlign="center"
                    mt={[4, 4, 0]}
                    width={['100%', '100%', '30%']}
                    pl={[0, 0, 8, 9]}
                />
                <Box width={['100%', '100%', '60%']}>
                    <Img fluid={firstImg.sources} />
                </Box>
            </Flex>
            <Flex
                as="section"
                {...sectionStyling}
                flexDirection={[
                    'column-reverse',
                    'column-reverse',
                    'row-reverse',
                ]}
            >
                <Text
                    dangerouslySetInnerHTML={{ __html: secondParagraph }}
                    {...articleStyling}
                />
                <Box width={['100%', '100%', '40%']}>
                    <Img fluid={secondImg.sources} />
                </Box>
            </Flex>

            <Flex
                as="section"
                {...sectionStyling}
                flexDirection={['column-reverse', 'column-reverse', 'row']}
            >
                <Text
                    dangerouslySetInnerHTML={{ __html: thirdParagraph }}
                    {...articleStyling}
                />
                <Box width={['100%', '100%', '40%']}>
                    <Img fluid={thirdImg.sources} />
                </Box>
            </Flex>
        </Box>
    );
};

export { About };
