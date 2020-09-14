import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Layout } from 'components/layout';

const Blog = (props: PageProps) => {
    const {
        data: { blog },
    } = props as any;
    const { content, title, date, summary } = blog as any;
    return (
        <Layout>
            <h1>{title}</h1>
            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </Layout>
    );
};

export default Blog;

export const query = graphql`
    query($slug: String) {
        blog(slug: { eq: $slug }) {
            content
            date
            summary
            title
        }
    }
`;
