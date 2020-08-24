import React from 'react';
import Img from 'gatsby-image';

import { Collection as CollectionSchema } from 'helper/schema/collection';
import ProductsDisplay from './products-display';

type Props = CollectionSchema;

const Collection: React.FC<Props> = ({
    name,
    cid,
    releaseDate,
    description,
    collectionImages,
}) => {
    return (
        <>
            <h1>Name is {name}</h1>
            <h4>Collection ID: {cid}</h4>
            <p>Release date: {releaseDate ? releaseDate : ''} </p>
            <p>and here are some descriptions {description} </p>
            {collectionImages.length > 0 &&
            collectionImages[0].childImageSharp.fluid ? (
                <Img fluid={collectionImages[0].childImageSharp.fluid} />
            ) : collectionImages[0].childImageSharp.fixed ? (
                <Img fixed={collectionImages[0].childImageSharp.fixed} />
            ) : (
                <></>
            )}
            <h3>Products are:</h3>
            <ProductsDisplay collectionName={name} />
        </>
    );
};

export default Collection;
