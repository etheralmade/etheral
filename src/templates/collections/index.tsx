import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Collection as CollectionSchema } from 'helper/schema/collection';
import Collection from './collections';

const CollectionTemplate = (props: PageProps) => {
    const { data } = props;
    const collectionData: CollectionSchema = (data as any)
        .collection as CollectionSchema;

    return (
        <>
            <Collection {...collectionData} />
        </>
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
