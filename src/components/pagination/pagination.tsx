import React from 'react';

import { Flex, Text } from 'rebass';

/**
 * @param numOfPages: number of pages to be rendered.
 * @param current: num of current in-view index.
 * @param handleClickPage: function to be called when a page number is clicked.
 */
type Props = {
    numOfPages: number;
    current: number;
    handleClickPage: (pageNum: number) => void;
};

const Pagination: React.FC<Props> = ({
    numOfPages,
    current,
    handleClickPage,
}) => {
    const filledArray = [...new Array(numOfPages)].map((_, i) => i);

    return (
        <Flex as="nav">
            {filledArray.map(num => (
                <Text
                    key={`pagination-${num}`}
                    onClick={() => handleClickPage(num)}
                    role="listitem"
                    fontWeight={num === current ? 'bold' : 'regular'}
                    bg={num === current ? 'black.0' : 'transparent'}
                    color={num === current ? '#fff' : 'black.0'}
                >
                    {num + 1}
                </Text>
            ))}
        </Flex>
    );
};

export { Pagination };
