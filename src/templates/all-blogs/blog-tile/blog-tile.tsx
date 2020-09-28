import React from 'react';
import { Link } from '@reach/router';

import Img, { FluidObject } from 'gatsby-image';
import { Flex, Box, Heading } from 'rebass';

import { Blog } from 'helper/schema';
import { getDateReadable } from 'helper/get-date';

import './styles.scss';

type Props = {
    blog: Blog;
    first: boolean;
};

const BlogTile: React.FC<Props> = ({ blog, first }) => {
    const { title, image, date, slug } = blog;

    return (
        <Link
            className={first ? 'blog-link__headline' : 'blog-link'}
            to={`blogs/${slug}`}
        >
            <Flex flexDirection="column">
                {image && (
                    <Box width="100%" height="auto">
                        <Img
                            fluid={
                                (image.childImageSharp.fluid as any)
                                    .sources as FluidObject
                            }
                            alt={title}
                            style={{ height: '100%', width: '100%' }}
                            imgStyle={{ objectPosition: 'center' }}
                        />
                    </Box>
                )}
                <Heading
                    as="h4"
                    fontFamily="heading"
                    fontWeight="medium"
                    fontSize={[3, 3, 4]}
                    mt={[4, 5]}
                    mb={[2]}
                >
                    {title}
                </Heading>
                <Heading
                    as="h5"
                    fontFamily="heading"
                    fontWeight="medium"
                    fontSize={[0, 0, 1]}
                    color="black.1"
                >
                    {getDateReadable(date)}
                </Heading>
            </Flex>
        </Link>
    );
};

export { BlogTile };
