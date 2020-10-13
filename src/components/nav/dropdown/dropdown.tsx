import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from '@reach/router';
import { findIndex } from 'lodash';
import Img, { FluidObject } from 'gatsby-image';
import { CSSTransition } from 'react-transition-group';

import { Box, Flex, Text } from 'rebass';
import { InlineIcon } from '@iconify/react';
import arrowDownSLine from '@iconify/icons-ri/arrow-down-s-line';

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

const Dropdown: React.FC<Props> = ({ currLocation }) => {
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

    const [displayCollectionS, setDisplayCollectionS] = useState(false);
    const [displayCategoryS, setDisplayCategoryS] = useState(false);

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
                height={['fit-content']}
                width={['100%', '100%', '100vw', '101vw']}
                pt={[0, 0, 5]}
                pb={[0, 0, 9]}
                px={[6, '10vw', 8, '10vw']}
                id="dropdown"
                bg={['#fff']}
                css={`
                    position: relative;
                    left: 0;

                    transition: 0.2s;

                    .box-L {
                        display: none;
                    }

                    .box-S {
                        display: block;
                    }

                    @media (min-width: 24em) and (orientation: landscape) {
                        top: 20vh;
                    }

                    @media (min-width: 48em) {
                        top: 10vh;
                        position: absolute;
                        left: -6%;

                        .box-L {
                            display: block;
                        }
                        .box-S {
                            display: none;
                        }
                    }

                    @media (min-width: 48em) and (orientation: landscape) {
                        top: 10vh;
                        left: -9%;
                    }

                    @media (min-width: 64em) {
                        top: 9vh;
                        left: -13%;
                    }
                `}
            >
                <Flex ml={[2, 2, 0]} justifyContent="space-between">
                    <Flex
                        flexDirection={['column', 'row', 'row']}
                        alignSelf="center"
                        pb={[0, 0, 7, 8]}
                    >
                        <Box
                            className="others"
                            my={0}
                            width={['fit-content', 'fit-content', '110px']}
                        >
                            <Link to="shop">
                                <Text variant="link">Shop all</Text>
                            </Link>
                            <Link to="shop/new-arrivals">
                                <Text variant="link">New arrivals</Text>
                            </Link>
                            <Link to="shop/best-sellers">
                                <Text variant="link">Best sellers</Text>
                            </Link>
                            <Link to="shop/back-in-stock">
                                <Text variant="link" mb={1}>
                                    Back In Stock
                                </Text>
                            </Link>
                        </Box>

                        {/* links for desktops */}
                        <Box className="collections box-L" ml={[0, 7]}>
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
                        <Box className="categories box-L" ml={[0, 7]}>
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
                        {/* end links for desktop */}

                        {/* links for mobile */}
                        <Box className="collections box-S">
                            <Text
                                variant="link"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    svg: {
                                        transition: '0.2s',
                                        transform: displayCollectionS
                                            ? 'rotate(180deg) !important'
                                            : '',
                                    },
                                }}
                                onClick={() =>
                                    setDisplayCollectionS(prev => !prev)
                                }
                                my={1}
                            >
                                Collections
                                <InlineIcon icon={arrowDownSLine} />
                            </Text>
                            <CSSTransition
                                in={displayCollectionS}
                                timeout={0}
                                unmountOnExit={true}
                            >
                                <Box ml={[2, 2, 0, 0]} mb={[4, 4, 0, 0]}>
                                    {collections.map(collection => (
                                        <Link
                                            key={collection}
                                            to={`shop?collections=${createUrlParam(
                                                collection
                                            )}`}
                                            onClick={handleClickWithQuery}
                                        >
                                            <Text variant="link">
                                                {collection}
                                            </Text>
                                        </Link>
                                    ))}
                                </Box>
                            </CSSTransition>
                        </Box>
                        <Box className="categories box-S">
                            <Text
                                variant="link"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    svg: {
                                        transition: '0.2s',
                                        transform: displayCategoryS
                                            ? 'rotate(180deg) !important'
                                            : '',
                                    },
                                }}
                                onClick={() =>
                                    setDisplayCategoryS(prev => !prev)
                                }
                                my={1}
                            >
                                Categories
                                <InlineIcon icon={arrowDownSLine} />
                            </Text>
                            <CSSTransition
                                in={displayCategoryS}
                                timeout={0}
                                unmountOnExit={true}
                            >
                                <Box ml={[2, 2, 0]} mb={[4, 4, 0]}>
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
                            </CSSTransition>
                        </Box>

                        {/* end links for mobile */}
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
