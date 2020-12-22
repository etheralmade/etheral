import React from 'react';
// import styling libs
import { Flex } from 'rebass';
// import local components
import Table from './table';
import Sizes from './sizes';

type Props = {};

/**
 * Date modeling blueprint..
 */
export type Data = {
    size: number;
    diameter: number;
    circum: number;
};

/**
 * Component to show a table consisting of size, diameter, circumgerence and also some size comparison(s)
 */
const SizeGuide: React.FC<Props> = () => {
    // data to be rendered. => Taken from client's specification.
    const data: Data[] = [
        { size: 5, diameter: 15.7, circum: 49.3 },
        { size: 6, diameter: 16.5, circum: 51.5 },
        { size: 7, diameter: 17.3, circum: 54.3 },
        { size: 8, diameter: 18.2, circum: 57.1 },
    ];

    return (
        <Flex
            flexDirection={['column', 'column', 'row']}
            alignItems={['center', 'center']}
            my={[7]}
            justifyContent="center"
        >
            <Table data={data} />
            <Sizes data={data} />
        </Flex>
    );
};

export { SizeGuide };
