import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { Layout } from 'components/layout';

import { Collection as CollectionSchema } from 'helper/schema/collection';
import Collection from './collections';

const CollectionTemplate = (props: PageProps) => {
    const { data } = props;
    const collectionData: CollectionSchema = (data as any)
        .collection as CollectionSchema;

    console.log(data);

    return (
        <Layout>
            <Collection {...collectionData} />
        </Layout>
    );
};

export default CollectionTemplate;

export const query = graphql`
    query($name: String) {
        collection(name: { eq: $name }) {
            cid
            description
            name
            releaseDate
            collectionImages {
                childImageSharp {
                    fixed {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    }
`;
