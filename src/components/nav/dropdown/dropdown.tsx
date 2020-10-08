import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from '@reach/router';
import { findIndex } from 'lodash';
import Img, { FluidObject } from 'gatsby-image';

import { Box, Flex, Text } from 'rebass';
import { InlineIcon } from '@iconify/react';
import arrowLeftLine from '@iconify/icons-ri/arrow-left-line';

import { createUrlParam } from 'helper/url-param';

type Props = {
    currLocation: string;
    goBack: () => void;
};

// function from gatsby-node.js to transform  a name to a certain slug format
// const nameToSlug = (name: string) =>
//     name
//         .toLowerCase()
//         .split(' ')
//         .join('-');

const Dropdown: React.FC<Props> = ({ goBack, currLocation }) => {
    const data = useStaticQuery(graphql`
        query {
            collections: allCollection {
                edges {
                    node {
                        name
                    }
                }
            }
            navImg: homepage {
                navigationImage
                imgs {
                    childImageSharp {
                        fluid(maxWidth: 300, maxHeight: 300, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                    url
                }
            }
        }
    `);

    const { collections: allCollection, navImg } = data;

    const { navigationImage, imgs } = navImg as any;

    const navImgIndexLeft = findIndex(
        imgs,
        (o: any) => o.url === navigationImage[0]
    );

    const navImgIndexRight = findIndex(
        imgs,
        (o: any) => o.url === navigationImage[1]
    );

    if (allCollection) {
        const collections: string[] = allCollection.edges.map(
            (edge: any) => edge.node.name
        );

        const navImgFluidLeft = imgs[navImgIndexLeft].childImageSharp.fluid as
            | FluidObject
            | FluidObject[];

        const navImgFluidRight = imgs[navImgIndexRight].childImageSharp
            .fluid as FluidObject | FluidObject[];

        const imgStyles = {
            height: [0, 0, 0, 250, 300],
            width: [0, 0, 0, 250, 300],
        };

        const handleClickWithQuery = () => {
            if (window && currLocation.includes('shop')) {
                setTimeout(() => {
                    window.location.reload();
                }, 200);
            }
        };

        return (
            <Box
                height={['92vh', '92vh', 'fit-content']}
                width={['100%', '100%', '100vw', '101vw']}
                pt={[4, 4, 5]}
                pb={[4, 4, 9]}
                px={[6, '10vw', 8, '10vw']}
                id="dropdown"
                bg={['brown.0', 'brown.0', '#fff']}
                css={`
                    position: absolute;
                    left: 0;
                    top: 10vh;
                    z-index: 888;

                    #go-back-dropdown {
                        svg {
                            margin-right: 12px;
                            transform: translateY(1px) !important;
                        }
                    }

                    @media (min-width: 24em) and (orientation: landscape) {
                        top: 20vh;
                    }

                    @media (min-width: 48em) {
                        #go-back-dropdown {
                            display: none;
                        }

                        top: 9vh;
                        transform: translateX(-5%);
                    }

                    @media (min-width: 48em) and (orientation: landscape) {
                        top: 10vh;
                    }

                    @media (min-width: 64em) {
                        left: -7%;
                    }
                `}
            >
                <Box id="go-back-dropdown" onClick={goBack}>
                    <Text variant="linkActive">
                        <InlineIcon icon={arrowLeftLine} />
                        Menu
                    </Text>
                </Box>
                <Flex ml={[6, 6, 0]} justifyContent="space-between">
                    <Flex
                        flexDirection={['column', 'row', 'row']}
                        alignSelf="center"
                        pb={[0, 0, 7, 8]}
                    >
                        <Box
                            className="others"
                            my={[5, 5, 0]}
                            width={['fit-content', 'fit-content', '110px']}
                        >
                            <Link to="/shop">
                                <Text variant="link">Shop all</Text>
                            </Link>
                            <Link to="/">
                                <Text variant="link">New arrivals</Text>
                            </Link>
                            <Link to="/">
                                <Text variant="link">Best sellers</Text>
                            </Link>
                            <Link to="/">
                                <Text variant="link">Sale?</Text>
                            </Link>
                        </Box>
                        <Box className="collections" ml={[0, 7]}>
                            <Text as="h3" variant="h3" mb={[3, 3, 5]}>
                                Collections
                            </Text>
                            <Box ml={[4, 4, 0, 0]} mb={[4, 4, 0, 0]}>
                                {collections.map(collection => (
                                    <Link
                                        key={collection}
                                        to={`shop?collections=${createUrlParam(
                                            collection
                                        )}`}
                                        onClick={handleClickWithQuery}
                                    >
                                        <Text variant="link">{collection}</Text>
                                    </Link>
                                ))}
                            </Box>
                        </Box>
                        <Box className="categories" ml={[0, 7]}>
                            <Text as="h3" variant="h3" mb={[3, 3, 5]}>
                                Categories
                            </Text>
                            <Box ml={[4, 4, 0]} mb={[4, 4, 0]}>
                                <Link
                                    to="/shop?categories=bracelet"
                                    onClick={handleClickWithQuery}
                                >
                                    <Text variant="link">Bracelets</Text>
                                </Link>
                                <Link
                                    to="/shop?categories=necklace"
                                    onClick={handleClickWithQuery}
                                >
                                    <Text variant="link">Necklaces</Text>
                                </Link>
                                <Link
                                    to="/shop?categories=ring"
                                    onClick={handleClickWithQuery}
                                >
                                    <Text variant="link">Rings</Text>
                                </Link>
                            </Box>
                        </Box>
                    </Flex>
                    <Flex sx={{ display: ['none', 'none', 'flex'] }}>
                        <Box {...imgStyles} mr={[0, 0, 0, 5, 8]}>
                            <Img fluid={navImgFluidLeft} />
                        </Box>
                        <Box
                            {...imgStyles}
                            sx={{
                                display: [
                                    'none',
                                    'none',
                                    'none',
                                    'none',
                                    'block',
                                ],
                            }}
                        >
                            <Img fluid={navImgFluidRight} />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        );
    } else {
        return <></>;
    }
};

export { Dropdown };
