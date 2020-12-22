import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Box } from 'rebass';

import { SEO } from 'components/seo';
import { Layout } from 'components/layout';

const FAQPage = ({ data }: PageProps) => {
    if (!data) {
        return null;
    }

    const { allPages }: any = data as any;

    const pageContent = allPages.edges[0].node.content;

    return (
        <Layout>
            <SEO title="Etheral | Frequently Asked Question" />
            <Box
                className="content"
                px={[6, 9, 9, '10vw', '13vw']}
                sx={{
                    fontFamily: 'body',
                    'h1, h2, h3, h4, h5, h6': {
                        fontFamily: 'heading',
                        my: [2],
                    },
                    '& *': {
                        lineHeight: 0.5,
                    },
                    '& span': { lineHeight: 1 },
                }}
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
