import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Box } from 'rebass';

import { Layout } from 'components/layout';
import SizeGuide from 'templates/size-guide';

const SizeGuidePage = ({ data }: PageProps) => {
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
                <SizeGuide />
            </Box>
        </Layout>
    );
};

export default SizeGuidePage;

export const query = graphql`
    query {
        allPages(filter: { pageName: { eq: "SG" } }) {
            edges {
                node {
                    pageName
                    content
                }
            }
        }
    }
`;
