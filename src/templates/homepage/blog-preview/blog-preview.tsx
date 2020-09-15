import React from 'react';
import Img, { FluidObject } from 'gatsby-image';

import { Box, Flex, Heading, Text } from 'rebass';

import { Blog } from 'helper/schema/blog';

type Props = {
    blog: Blog;
};

const BlogPreview: React.FC<Props> = ({ blog }) => {
    const { title, summary, date, image } = blog;

    return (
        <Flex px={[]}>
            <Box width={['50%']}>
                {/* Render date here. */}
                {/* title */}
                <Heading as="h3" data-testid="title">
                    {title}
                </Heading>
                {/* summary */}
                <Text as="article" data-testid="summary">
                    {summary}
                </Text>
            </Box>
            {/* render preview image. */}
            <Box width={['50%']}>
                {image && (
                    <Img fluid={image.childImageSharp.fluid as FluidObject} />
                )}
            </Box>
        </Flex>
    );
};

export { BlogPreview };
