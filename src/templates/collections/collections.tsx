import React from 'react';
// import Img from 'gatsby-image';
// import { Box, Heading } from 'rebass';

import { Collection as CollectionSchema } from 'helper/schema/collection';
import { Product } from 'helper/schema/product';
import useAllProducts from 'helper/use-all-products';
import Shop from 'templates/shop';

type Props = CollectionSchema;

const Collection: React.FC<Props> = ({
    name,
    // cid,
    // releaseDate,
    // description,
    // collectionImages,
    // urls,
}) => {
    const data = useAllProducts();
    const displayProducts: Product[] = data.filter(
        product => product.collection === name
    );

    return (
        <Shop products={displayProducts} type={name} isCollectionPage={true} />
    );
};

export default Collection;
