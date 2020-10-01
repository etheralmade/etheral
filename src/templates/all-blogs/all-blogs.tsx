import React, { useState, useEffect } from 'react';

import { Flex } from 'rebass';

import { Blog } from 'helper/schema';
import BlogTile from './blog-tile';
import Pagination from 'components/pagination';

type Props = {
    blogs: Blog[];
};

/**
 * productPerPage: num of products to be rendered per page.
 * currIndex: current view page num.
 */
type PaginationState = {
    blogPerPage: number;
    currIndex: number;
};

const initialPagination = {
    blogPerPage: 5,
    currIndex: 0,
};

const AllBlogs: React.FC<Props> = ({ blogs }) => {
    // store: all products to be displayed (not filtered by pagination.)
    const [store, setStore] = useState<Blog[]>([]);
    // add product per page
    const [pagination, setPagination] = useState<PaginationState>(
        initialPagination
    );
    const [numOfPages, setNumOfPages] = useState(0);

    // to display products (filtered by pagination)
    const [display, setDisplay] = useState<Blog[]>([]);

    useEffect(() => {
        const duplicated = [...blogs, ...blogs, ...blogs, ...blogs];

        const debug = true;

        setStore(debug ? duplicated : blogs);
    }, []);

    useEffect(() => {
        paginate({ ...pagination }, store);
        calculateNumOfPages({ ...pagination }, store);
    }, [store, pagination]);

    const paginate = (
        { blogPerPage, currIndex }: PaginationState,
        inStore: Blog[]
    ) => {
        const maxIndex = inStore.length;

        const firstIndex = currIndex * blogPerPage;
        const lastIndex = firstIndex + blogPerPage;

        // check if first and/or last index is larger than max and adjust accordingly
        const temp = inStore.slice(
            firstIndex >= maxIndex ? maxIndex : firstIndex,
            lastIndex >= maxIndex ? maxIndex : lastIndex
        );

        setDisplay(temp);
    };

    const calculateNumOfPages = (
        { blogPerPage }: PaginationState,
        inStore: Blog[]
    ) => {
        const initialNumOfPages = inStore.length / blogPerPage;
        setNumOfPages(
            inStore.length % blogPerPage === 0 // check for any rest from the division.
                ? initialNumOfPages
                : Math.floor(initialNumOfPages + 1) // add an extra page if any rest is there.
        );
    };

    const handleClickPage = (pageNum: number) => {
        setPagination(prev => ({
            ...prev,
            currIndex: pageNum,
        }));
    };

    const goToFirst = () => {
        setPagination(prev => ({
            ...prev,
            currIndex: 0,
        }));
    };

    const goToLast = () => {
        setPagination(prev => ({
            ...prev,
            currIndex: numOfPages - 1,
        }));
    };

    return (
        <Flex flexDirection="column" alignItems="center">
            <Flex
                flexWrap="wrap"
                justifyContent="space-between"
                className="content"
                px={[5, 5, 8]}
                width="100%"
                maxWidth="1920px"
                m="0 auto"
            >
                {display.map((blog, i) => (
                    <BlogTile
                        key={`${blog.slug}-${i}`}
                        blog={blog}
                        first={i === 0}
                    />
                ))}
            </Flex>
            <Pagination
                numOfPages={numOfPages}
                current={pagination.currIndex}
                handleClickPage={handleClickPage}
                goToFirst={goToFirst}
                goToLast={goToLast}
            />
        </Flex>
    );
};

export { AllBlogs };
