import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Heading } from 'rebass';

type Props = {};

// how to render stockist => use lodash groupBy() => group and render stockist(s) by location.
// more or less the same thing as consignment.
const Stockist: React.FC<Props> = () => {
    const data = useStaticQuery(graphql`
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

    if (data) {
        const consignments = data.allConsignment.edges.map(
            (edge: any) => edge.node
        );

        console.log(consignments);

        return (
            <Box ml={[]} mt={[5, 5]}>
                <Heading as="h4" variant="h4">
                    STOCKISTS
                </Heading>
                <Box mt={[4, 4]}></Box>
            </Box>
        );
    } else {
        return null;
    }
};

export { Stockist };
