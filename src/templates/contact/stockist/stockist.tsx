import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { groupBy, toPairs } from 'lodash';

import { Box, Heading } from 'rebass';
import { InlineIcon } from '@iconify/react';
import mapPin2Fill from '@iconify/icons-ri/map-pin-2-fill';

import StockistItem, { Props as StockistItemProps } from './stockist-item';

const DEBUG = false;
const mockData = {
    allConsignment: {
        edges: [
            {
                node: {
                    address: 'Test',
                    location: 'jakarta',
                    name: 'hello',
                    phoneNumber: 12,
                    web: 'asdasds',
                    zipCode: 12,
                },
            },
        ],
    },
};

// how to render stockist => use lodash groupBy() => group and render stockist(s) by location.
// more or less the same thing as consignment.
const Stockist: React.FC<{}> = () => {
    const queryResult = useStaticQuery(graphql`
        query {
            allConsignment {
                edges {
                    node {
                        address
                        location
                        name
                        phoneNumber
                        web
                        zipCode
                    }
                }
            }
        }
    `);

    const data = !DEBUG ? queryResult : mockData;

    if (data) {
        // apply upercase to every consignemnt's location => case safety on grouping
        const consignmentsQuery = data.allConsignment.edges
            .map((edge: any) => edge.node)
            .map((csg: any) => ({
                ...csg,
                location: csg.location.toUpperCase(),
            }))
            .filter((cons: any) => cons.name !== '');

        // then grouping them by location.
        const consignments = groupBy(consignmentsQuery, 'location');

        if (Object.keys(consignments).length > 0) {
            return (
                <Box ml={[0, 0, 6, 8]} mt={[7, 7, 5]}>
                    <Heading
                        as="h4"
                        variant="h4"
                        textAlign={['center', 'center', 'left']}
                    >
                        STOCKISTS
                    </Heading>
                    <Box mt={[4, 4]}>
                        {/* to pairs => map object key and value into an array. [0] = key, [1] = value */}
                        {toPairs(consignments).map(pair => (
                            <Box data-testid={pair[0]} as="ul" key={pair[0]}>
                                <Heading
                                    variant="h4"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: [
                                            'center',
                                            'center',
                                            'flex-start',
                                        ],
                                        svg: { mr: [] },
                                    }}
                                >
                                    <InlineIcon icon={mapPin2Fill} />
                                    {pair[0]}
                                </Heading>
                                <>
                                    {pair[1].map(val => (
                                        <StockistItem
                                            key={val.name}
                                            {...(val as StockistItemProps)}
                                        />
                                    ))}
                                </>
                            </Box>
                        ))}
                    </Box>
                </Box>
            );
        }

        return null;
    } else {
        return null;
    }
};

export { Stockist };
