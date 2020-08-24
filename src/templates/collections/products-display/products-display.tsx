import React from 'react';
import { useStaticQuery } from 'gatsby';
import useAllProducts from 'helper/useAllProducts';

type Props = {
    collectionName: string;
};

const ProductsDisplay: React.FC<Props> = ({ collectionName }) => {
    const data = useAllProducts();

    console.log(data);

    return <></>;
};

export { ProductsDisplay };
