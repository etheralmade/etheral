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
                height={['92vh', '92vh', '92vh', 'fit-content']}
                width={['100%', '100%', '100%', '100vw']}
                py={[4, 4, 4, 4]}
                px={[6, 6, 6, '15vw']}
                id="dropdown"
                bg={['brown.0', 'brown.0', 'brown.0', '#fff']}
                css={`
                    position: absolute;
                    left: 0;
                    top: 8vh;
                    z-index: 2;

                    @media (min-width: 64em) {
                        #go-back-dropdown {
                            display: none;
                        }

                        top: 10vh;
                        left: -10%;
                        transform: translateX(-8%);
                    }
                `}
            >
                <Box id="go-back-dropdown" onClick={goBack}>
                    <Text variant="linkActive">
                        <InlineIcon icon={arrowLeftLine} />
                        Menu
                    </Text>
                </Box>
                <Flex>
                    <Flex>
                        <Box>
                            <Text>Collections</Text>
                            <Box ml={[4]}>
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
                    </Flex>
                </Flex>
            </Box>
        );
    } else {
        return <></>;
    }
};

export { Dropdown };
