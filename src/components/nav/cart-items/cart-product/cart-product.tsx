import React from 'react';
import Img, { FixedObject } from 'gatsby-image';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import { Flex, Text, Box } from 'rebass';
import { Icon, InlineIcon } from '@iconify/react';
import addLine from '@iconify/icons-ri/add-line';
import subtractLine from '@iconify/icons-ri/subtract-line';
import priceTag3Fill from '@iconify/icons-ri/price-tag-3-fill';

import { Product } from 'helper/schema/product';
import useAllProductImages from 'helper/use-all-product-images';
import { addToCart, removeFromCart } from 'state/actions/cart';
import {
    IState as ICurrencyState,
    Currencies,
} from 'state/reducers/currency-reducer';
import { withDiscount } from 'helper/with-discount';
import { theme } from 'styles';

export type Props = ICurrencyState & {
    item: {
        product: Product;
        amount: number;
        details: {
            size: string;
            gemSize?: string;
            gemType?: string;
        };
    };
};

const CartProduct: React.FC<Props> = ({ item, currency }) => {
    const { amount, product, details } = item;

    const { extractImgs } = useAllProductImages();
    const dispatch = useDispatch();

    const { xs, s }: any = extractImgs(product, false);

    const handleAdd = () => {
        dispatch(addToCart({ ...product, orderNote: details }, false, 1));
    };

    const handleRemove = () => {
        dispatch(removeFromCart({ ...product, orderNote: details }, false, 1));
    };

    // option to remove the product from cart.
    const handleRemoveAll = () => {
        dispatch(removeFromCart(product, false, amount));
    };

    // destructure attrs needed.
    const {
        prices: { idrPrice, ausPrice, discountPercentage },
        name,
    } = product;
    const discounted = discountPercentage > 0;

    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let price;
    // render price based on global currency state
    switch (currency) {
        case Currencies.IDR:
            price = `IDR ${
                discounted
                    ? withDiscount(idrPrice, discountPercentage)
                    : idrPrice * amount
            }`;
            break;
        case Currencies.AUD:
            price = `AUD ${
                discounted
                    ? withDiscount(ausPrice, discountPercentage)
                    : ausPrice * amount
            }`;
            break;
        default:
            price = `IDR ${
                discounted
                    ? withDiscount(idrPrice, discountPercentage)
                    : idrPrice * amount
            }`;
            break;
    }

    if (s) {
        // img sources gatsby image.
        const sources = [
            {
                ...get(xs, 'img[0].childImageSharp.fixed'),
                media: '(max-width: 700px)',
            } as FixedObject,
            get(s, 'img[0].childImageSharp.fixed') as FixedObject,
        ];

        return (
            <Flex
                alignItems="center"
                justifyContent="space-between"
                my={[3]}
                py={[2]}
                px={[2]}
                width={[300]}
                css={`
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    position: relative;
                `}
            >
                <Img fixed={sources} />
                <Box width={[160]}>
                    {/* product name */}
                    <Text
                        fontFamily="heading"
                        fontSize={[1, 1, 2]}
                        fontWeight="bold"
                    >
                        {name}
                    </Text>
                    <Text
                        fontFamily="heading"
                        fontSize={[1, 1, 2]}
                        fontWeight="body"
                        as="section"
                    >
                        {/* render details of the product => conditional. */}
                        Size: {details.size}
                        {details.gemType && (
                            <>
                                <br />
                                Gem: {details.gemType}
                            </>
                        )}
                        {details.gemSize && (
                            <>
                                <br />
                                Gem diameter: {details.gemSize}
                            </>
                        )}
                    </Text>
                    <Flex justifyContent="space-between" width="100%" mt={[2]}>
                        <Flex
                            alignItems="center"
                            bg="black.1"
                            color="#fff"
                            css={`
                                .cart-icons {
                                    height: 16px;
                                    width: 16px;
                                }
                            `}
                        >
                            <Flex
                                variant="center"
                                mr={[1]}
                                onClick={handleRemove}
                            >
                                <Icon
                                    className="cart-icons"
                                    icon={subtractLine}
                                />
                            </Flex>
                            <Text
                                fontFamily="heading"
                                fontSize={[10]}
                                fontWeight="medium"
                            >
                                {amount}
                            </Text>
                            <Flex variant="center" ml={[1]} onClick={handleAdd}>
                                <Icon className="cart-icons" icon={addLine} />
                            </Flex>
                        </Flex>
                        <Text
                            fontFamily="body"
                            fontSize={[1]}
                            fontWeight="semiBold"
                            sx={{ svg: { ml: [4] } }}
                        >
                            {price}
                            {discounted && (
                                <InlineIcon
                                    icon={priceTag3Fill}
                                    color={theme.colors.misc.discount}
                                />
                            )}
                        </Text>
                    </Flex>
                </Box>
                <Text
                    fontFamily="body"
                    fontWeight="body"
                    fontSize={[0, 0, 1]}
                    color="black.1"
                    sx={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '6px',
                        textDecoration: 'underline',
                    }}
                    onClick={handleRemoveAll}
                >
                    Remove
                </Text>
            </Flex>
        );
    }

    return null;
};

export { CartProduct };
