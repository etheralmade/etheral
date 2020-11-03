import React from 'react';
// import styling libs
import { Flex } from 'rebass';
// import local components
import Table from './table';

type Props = {};

/**
 * Component to show a table consisting of size, diameter, circumgerence and also some size comparison(s)
 */
const SizeGuide: React.FC<Props> = () => {
    return (
        <Flex>
            <Table />
        </Flex>
    );
};

export { SizeGuide };
