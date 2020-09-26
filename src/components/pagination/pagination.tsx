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

const createPagination = (
    first: number,
    last: number,
    numOfPages: number
): number[] => {
    const MAX_PAGE_COUNT = 5; // max num of pages to display on the pagination component.

    const pageCount = last - first;

    if (pageCount < MAX_PAGE_COUNT) {
        if (MAX_PAGE_COUNT > numOfPages) {
            if (last === numOfPages) {
                const firstFromLast = last - numOfPages;
                return [...new Array(numOfPages)].map(
                    (_, i) => firstFromLast + i
                );
            } else {
                return [...new Array(numOfPages)].map((_, i) => first + i);
            }
        }

        if (first === 0) {
            // return 0 to 5.
            return [...new Array(MAX_PAGE_COUNT)].map((_, i) => first + i);
        } else if (last === numOfPages) {
            const firstFromLast = last - MAX_PAGE_COUNT;
            return [...new Array(MAX_PAGE_COUNT)].map(
                (_, i) => firstFromLast + i
            );
        } else {
            return [...new Array(pageCount + 1)].map((_, i) => first + i); // +1 -> including the current page.
        }
    } else {
        // no probs here
        return [...new Array(pageCount + 1)].map((_, i) => first + i); // +1 -> including the current page.
    }
};

const Pagination: React.FC<Props> = ({
    numOfPages,
    current,
    handleClickPage,
}) => {
    const firstPage = current - 2 < 0 ? 0 : current - 2;
    const lastPage = current + 2 >= numOfPages ? numOfPages : current + 2;

    const pagination = createPagination(firstPage, lastPage, numOfPages);

    const handleClick = (num: number) => {
        if (window) {
            window.scrollTo(0, 0);
        }

        handleClickPage(num);
    };

    return (
        <Flex as="nav">
            {pagination.map(num => (
                <Text
                    key={`pagination-${num}`}
                    onClick={() => handleClick(num)}
                    role="listitem"
                    fontWeight={num === current ? 'bold' : 300}
                    fontFamily="body"
                    fontSize={[1, 1, 2]}
                    color="black.0"
                    height={[24]}
                    width={[24]}
                    mx={[3]}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': { cursor: 'pointer' },
                    }}
                >
                    {num + 1}
                </Text>
            ))}
        </Flex>
    );
};

export { Pagination };
