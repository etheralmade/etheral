import React from 'react';
import { Link } from '@reach/router';
import Img from 'gatsby-image';

import { Product } from 'helper/schema/product';

type Props = {
    products: Product[];
};

const ProductsDisplay: React.FC<Props> = ({ products }) => {
    const returnImage = (product: Product): React.ReactNode => {
        if (product.productImages[0]) {
            const mainImage = product.productImages[0].childImageSharp;
            if (mainImage.fixed) {
                return <Img fixed={mainImage.fixed} />;
            } else if (mainImage.fluid) {
                return <Img fluid={mainImage.fluid} />;
            } else {
                return <></>;
            }
        } else {
            return <></>;
        }
    };

    return (
        <>
            {products.map(product => (
                <React.Fragment key={product.pid}>
                    <h2 data-testid="product-name">{product.name} </h2>
                    {returnImage(product)}
                    <Link to={`/${product.slug}`}>
                        <button>Go to</button>
                    </Link>
                </React.Fragment>
            ))}
        </>
    );
};

export { ProductsDisplay };
