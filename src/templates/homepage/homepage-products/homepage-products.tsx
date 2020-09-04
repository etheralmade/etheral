import React from 'react';

import { Flex, Box, Heading } from 'rebass';

import { Product } from 'helper/schema/product';

type Props = {
    products: Product[];
};

const HomepageProducts: React.FC<Props> = ({ products }) => {
    return (
        <Flex variant="outerWrapper">
            <Box variant="innerWrapper">
                <Heading
                    textAlign="center"
                    as="h2"
                    variant="h2"
                    mb={[5, 5, 6, 7]}
                >
                    New Arrivals
                </Heading>
            </Box>
        </Flex>
    );
};

export { HomepageProducts };
