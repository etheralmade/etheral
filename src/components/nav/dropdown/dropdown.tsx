import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from '@reach/router';

import { Box, Flex, Text } from 'rebass';
import { InlineIcon } from '@iconify/react';
import arrowLeftLine from '@iconify/icons-ri/arrow-left-line';

type Props = {
    currLocation: string;
    goBack: () => void;
};

// function from gatsby-node.js to transform  a name to a certain slug format
const nameToSlug = (name: string) =>
    name
        .toLowerCase()
        .split(' ')
        .join('-');

const Dropdown: React.FC<Props> = ({ goBack, currLocation }) => {
    const data = useStaticQuery(graphql`
        query {
            allCollection {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    `);

    const { allCollection } = data;

    if (allCollection) {
        const collections: string[] = allCollection.edges.map(
            (edge: any) => edge.node.name
        );

        return (
            <Box
                height={['92vh', '92vh', 'fit-content']}
                width={['100%', '100%', '101vw']}
                pt={[4, 4, 5]}
                pb={[4, 4, 9]}
                px={[6, '10vw', 8, '10vw']}
                id="dropdown"
                bg={['brown.0', 'brown.0', '#fff']}
                css={`
                    position: absolute;
                    left: 0;
                    top: 8vh;
                    z-index: 2;

                    #go-back-dropdown {
                        svg {
                            margin-right: 12px;
                            transform: translateY(1px) !important;
                        }
                    }

                    @media (min-width: 24em) {
                        top: 15vh;
                    }

                    @media (min-width: 48em) {
                        #go-back-dropdown {
                            display: none;
                        }

                        top: 9vh;
                        transform: translateX(-5%);
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
                <Flex ml={[6, 6, 0]}>
                    <Flex
                        flexDirection={['column', 'row', 'row']}
                        flexWrap="wrap"
                    >
                        <Box className="others" my={[5, 5, 0]}>
                            <Link to="/">
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
                                        to={`/${nameToSlug(collection)}`}
                                    >
                                        <Text
                                            variant={
                                                currLocation.includes(
                                                    `/${nameToSlug(collection)}`
                                                )
                                                    ? 'linkActive'
                                                    : 'link'
                                            }
                                        >
                                            {collection}
                                        </Text>
                                    </Link>
                                ))}
                            </Box>
                        </Box>
                        <Box className="categories" ml={[0, 7]}>
                            <Text as="h3" variant="h3" mb={[3, 3, 5]}>
                                Categories
                            </Text>
                            <Box ml={[4, 4, 0]} mb={[4, 4, 0]}>
                                <Link to="/">
                                    <Text variant="link">Bracelets</Text>
                                </Link>
                                <Link to="/">
                                    <Text variant="link">Necklaces</Text>
                                </Link>
                                <Link to="/">
                                    <Text variant="link">Rings</Text>
                                </Link>
                            </Box>
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
