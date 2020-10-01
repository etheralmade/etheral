import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { Link } from '@reach/router';

import { Box, Flex, Heading, Text, Button } from 'rebass';

import { Blog } from 'helper/schema/blog';
import { getDateReadable } from 'helper/get-date';

type Props = {
    blog: Blog;
};

const BlogPreview: React.FC<Props> = ({ blog }) => {
    const { title, summary, date, image, slug } = blog;

    return (
        <Box px={[6, 6, 8]} mb={[4, 4, 5, 6]}>
            <Flex
                flexDirection={['column', 'column', 'column', 'row']}
                alignItems={[
                    'unset',
                    'unset',
                    'center',
                    'flex-start',
                    'center',
                ]}
                justifyContent="space-between"
            >
                {/* render preview image. */}
                <Box width={['100%', '100%', '80%', '48%', '48%']}>
                    {image && (
                        <Img
                            fluid={image.childImageSharp.fluid as FluidObject}
                        />
                    )}
                </Box>
                {/* actual preview. */}
                <Box width={['100%', '100%', '80%', '48%', '48%']}>
                    {/* Render date here. */}
                    <Text as="h5" variant="h5" mt={[4, 4, 6, 0]}>
                        {getDateReadable(date)}
                    </Text>
                    {/* title */}
                    <Heading as="h3" variant="h3" data-testid="title" mb={[4]}>
                        {title}
                    </Heading>
                    {/* summary */}
                    <Text as="article" variant="body" data-testid="summary">
                        {summary}
                    </Text>
                    <Link to={`/blogs/${slug}`}>
                        <Button
                            width={['100%', '100%', 'fit-content']}
                            mt={[4]}
                            mb={[7]}
                        >
                            Read More
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
};

export { BlogPreview };
