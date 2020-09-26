import React from 'react';

import { Flex, Text, Box } from 'rebass';
import { Icon } from '@iconify/react';
import speedMiniFill from '@iconify/icons-ri/speed-mini-fill';
import rewindMiniFill from '@iconify/icons-ri/rewind-mini-fill';

/**
 * @param numOfPages: number of pages to be rendered.
 * @param current: num of current in-view index.
 * @param handleClickPage: function to be called when a page number is clicked.
 */
type Props = {
    numOfPages: number;
    current: number;
    handleClickPage: (pageNum: number) => void;
    goToFirst: () => void;
    goToLast: () => void;
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
    goToFirst,
    goToLast,
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

    const buttonStyles = {
        height: '100%',
        position: 'relative',
        top: '50%',
        transition: '0.2s',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.2) !important',
        },
    };

    return (
        <Flex as="nav" alignItems="center">
            {!pagination.includes(0) && (
                <Flex
                    id="go-to-first"
                    role="button"
                    onClick={goToFirst}
                    variant="center"
                    sx={{ svg: buttonStyles }}
                >
                    <Icon icon={rewindMiniFill} />
                </Flex>
            )}
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
            {!pagination.includes(numOfPages - 1) && (
                <Flex
                    id="go-to-last"
                    role="button"
                    onClick={goToLast}
                    variant="center"
                    sx={{ svg: buttonStyles }}
                >
                    <Icon icon={speedMiniFill} />
                </Flex>
            )}
        </Flex>
    );
};

export { Pagination };
