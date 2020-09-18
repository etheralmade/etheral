import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Layout } from 'components/layout';
import { Blog } from './blog';
import { Blog as BlogSchema } from 'helper/schema';

const BlogPage = (props: PageProps) => {
    if (props.data) {
        const {
            data: { blog },
        } = props as any;

        return (
            <Layout>
                <Blog
                    blog={
                        {
                            ...blog,
                            date: new Date(Date.parse(blog.date)),
                        } as BlogSchema
                    }
                />
            </Layout>
        );
    } else {
        return null;
    }
};

export default BlogPage;

export const query = graphql`
    query($slug: String) {
        blog(slug: { eq: $slug }) {
            slug
            content
            date
            title
            summary
        }
    }
`;
