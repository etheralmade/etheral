import React, { useState } from 'react';
import Img from 'gatsby-image';
import { useDispatch } from 'react-redux';

import { Product as ProductSchema } from 'helper/schema/product';
import { addToCart } from 'state/actions/cart';

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
    slug,
    urls,
    weight,
    ausPrice,
    usdPrice,
}) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            addToCart(
                {
                    name,
                    pid,
                    description,
                    idrPrice,
                    amount,
                    collection,
                    slug,
                    productImages,
                    urls,
                    weight,
                    ausPrice,
                    usdPrice,
                },
                qty !== 1 ? qty : undefined
            )
        );
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQty(parseInt(event.target.value, 10));
    };

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
                    <img src={urls[0]} alt={name} />
                )
            ) : (
                <img src={urls[0]} alt={name} />
            )}
            <label htmlFor="amount">Number of items to order</label>
            <input
                onChange={handleChange}
                value={qty}
                type="number"
                placeholder="num"
                id="amount"
            />
            <button onClick={handleClick}>Add to cart</button>
        </>
    );
};

export default Products;
