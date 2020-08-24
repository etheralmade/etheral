import React from 'react';
import Img from 'gatsby-image';

import { Collection as CollectionSchema } from 'helper/schema/collection';
import { Product } from 'helper/schema/product';
import useAllProducts from 'helper/use-all-products';
import ProductsDisplay from './products-display';

type Props = CollectionSchema;

const Collection: React.FC<Props> = ({
    name,
    cid,
    releaseDate,
    description,
    collectionImages,
}) => {
    const data = useAllProducts();
    const displayProducts: Product[] = data.filter(
        product => product.collection === name
    );

    console.log(collectionImages);

    return (
        <>
            <h1>Name is {name}</h1>
            <h4>Collection ID: {cid}</h4>
            <p>Release date: {releaseDate ? releaseDate : ''} </p>
            <p>and here are some descriptions {description} </p>
            {collectionImages[0] ? (
                collectionImages[0].childImageSharp.fluid ? (
                    <Img fluid={collectionImages[0].childImageSharp.fluid} />
                ) : collectionImages[0].childImageSharp.fixed ? (
                    <Img fixed={collectionImages[0].childImageSharp.fixed} />
                ) : (
                    <></>
                )
            ) : (
                <></>
            )}
            <h3>Products are:</h3>
            <ProductsDisplay products={displayProducts} />
        </>
    );
};

export default Collection;
