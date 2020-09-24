import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Flex, Text } from 'rebass';

import { Product as ProductSchema } from 'helper/schema/product';
import { addToCart } from 'state/actions/cart';
import Breadcrumbs from 'components/breadcrumbs';
import ProductImage, { ImgProps } from './product-image';

type Props = ProductSchema;

const Products: React.FC<Props> = product => {
    const {
        name,
        pid,
        description,
        amount,
        category,
        collection,
        productImages,
        slug,
        urls,
        weight,
        prices: { idrPrice, ausPrice, discountPercentage },
        ...rest
    } = product;

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const displayText = 'related products';

    const submitToCart = () => {
        dispatch(
            addToCart(
                {
                    name,
                    pid,
                    description,
                    amount,
                    collection,
                    slug,
                    productImages,
                    urls,
                    weight,
                    category,
                    prices: { idrPrice, ausPrice, discountPercentage },
                    ...rest,
                },
                qty !== 1 ? qty : undefined
            )
        );
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQty(parseInt(event.target.value, 10));
    };

    return (
        <Box px={[6, 6]} className="content">
            {/* breadcrumbs */}
            <Breadcrumbs location={`shop/${collection}/${name}`} />

            {/* product container */}
            <Flex flexDirection={['column', 'row']} alignItems="center">
                {/* product image (carousel) */}
                <ProductImage
                    // hard cast => to overcome type safety.
                    images={(productImages as unknown) as ImgProps}
                    productName={name}
                />

                {/* product infos. */}
            </Flex>

            {/* related products container */}
            <Box>
                <Text
                    textAlign="center"
                    as="h4"
                    variant="h2"
                    mb={[5, 5, 6, 7]}
                    fontWeight="body"
                >
                    {displayText.toUpperCase()}
                </Text>

                {/* related products */}
                <Flex />
            </Box>
        </Box>
    );
};

export default Products;
