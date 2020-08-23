import React from 'react';
import { PageProps, graphql } from 'gatsby';

const CollectionTemplate = (props: PageProps) => {
    const { data } = props;
    const collectionData: Collection = (data as any).collection as Collection;
    const { name, cid, releaseDate, description } = collectionData;

    return (
        <>
            <h1>Name is {name}</h1>
            <h4>Collection ID: {cid}</h4>
            <p>Release date: {releaseDate ? releaseDate : ''} </p>
            <p>and here are some descriptions {description} </p>
        </>
    );
};

export default CollectionTemplate;

export const query = graphql`
    query($name: String) {
        collection(name: { eq: $name }) {
            cid
            collectionPromotionalImages
            description
            name
            releaseDate
        }
    }
`;
