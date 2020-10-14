import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Box } from 'rebass';

import { Layout } from 'components/layout';

const FAQPage = ({ data }: PageProps) => {
    if (!data) {
        return null;
    }

    const { allPages }: any = data as any;

    const pageContent = allPages.edges[0].node.content;

    return (
        <Layout>
            <Box
                className="content"
                px={[6, 9, 9, '10vw', '13vw']}
                sx={{ 'h1, h2, h3, h4, h5, h6': { fontFamily: 'heading' } }}
            >
                <Box dangerouslySetInnerHTML={{ __html: pageContent }} />
            </Box>
        </Layout>
    );
};

export default FAQPage;

export const query = graphql`
    query {
        allPages(filter: { pageName: { eq: "FAQ" } }) {
            edges {
                node {
                    pageName
                    content
                }
            }
        }
    }
`;
