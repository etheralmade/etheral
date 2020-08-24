import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Product } from 'helper/schema/product';

const ProductsTemplate = (props: PageProps) => {
    const { data } = props;
    const productData: Product = (data as any).product as Product;
    const {
        name,
        pid,
        description,
        idrPrice,
        amount,
        category,
        availableSizes,
        productImages,
        collection,
    } = productData;

    console.log(data);

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
            {productImages[0] && productImages[0].childImageSharp.fluid ? (
                <Img fluid={productImages[0].childImageSharp.fluid} />
            ) : productImages[0].childImageSharp.fixed ? (
                <Img fixed={productImages[0].childImageSharp.fixed} />
            ) : (
                <></>
            )}
        </>
    );
};

export default ProductsTemplate;

export const query = graphql`
    query($slug: String) {
        product(slug: { eq: $slug }) {
            pid
            slug
            amount
            availableSizes
            category
            collection
            description
            idrPrice
            productImages {
                childImageSharp {
                    fixed {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            name
        }
    }
`;
