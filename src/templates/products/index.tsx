import React from 'react';
import { PageProps, graphql } from 'gatsby';

import { Product } from 'helper/schema/product';

const ProductsTemplate = (props: PageProps) => {
    const { data } = props;
    const productData: Product = (data as any).product as Product;
    const {
        name,
        pid,
        image,
        description,
        idrPrice,
        amount,
        category,
        availableSizes,
        collection,
    } = productData;

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
            <img src={image[0]} />
        </>
    );
};

export default ProductsTemplate;

export const query = graphql`
    query($slug: String) {
        product(slug: { eq: $slug }) {
            slug
            amount
            availableSizes
            category
            collection
            description
            idrPrice
            image
            name
        }
    }
`;
