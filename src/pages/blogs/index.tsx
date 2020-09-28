import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Layout } from 'components/layout';
import AllBlogs from 'templates/all-blogs';

//  all blogs page
const AllBlogsPage = (props: PageProps) => {
    const { blogs } = props as any;

    if (blogs) {
        console.log(blogs);

        return (
            <Layout>
                <AllBlogs />
            </Layout>
        );
    } else {
        return null;
    }
};

export default AllBlogsPage;

export const query = graphql`
    query {
        blogs: allBlog(sort: { fields: date, order: DESC }) {
            edges {
                node {
                    slug
                    summary
                    title
                    date
                    image {
                        url
                    }
                }
            }
        }
    }
`;
