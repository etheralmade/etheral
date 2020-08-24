import React from 'react';
import Img from 'gatsby-image';

import { Product as ProductSchema } from 'helper/schema/product';

type Props = ProductSchema;

const Products: React.FC<Props> = ({
    name,
    pid,
    description,
    idrPrice,
    amount,
    category,
    collection,
    productImages,
}) => {
    const addToCart = () => {
        console.log('adding');
    };

    console.log(productImages);

    return (
        <>
            <h1>Name is {name}</h1>
            <h4>Product ID: {pid}</h4>
            <p>
                and here are some descriptions {description}, the price is{' '}
                <strong>{idrPrice}</strong> <i>only {amount} available </i>
            </p>
            <p>
                {' '}
                category: {category} collection: {collection}{' '}
            </p>
            <p>ssome img</p>
            {productImages[0] ? (
                productImages[0].childImageSharp.fluid ? (
                    <Img fluid={productImages[0].childImageSharp.fluid} />
                ) : productImages[0].childImageSharp.fixed ? (
                    <Img fixed={productImages[0].childImageSharp.fixed} />
                ) : (
                    <></>
                )
            ) : (
                <></>
            )}
            <button onClick={addToCart}>Add to cart</button>
        </>
    );
};

export default Products;
