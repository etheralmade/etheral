import React from 'react';
import Img, { FixedObject } from 'gatsby-image';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import { Flex, Text, Box } from 'rebass';
import { Icon, InlineIcon } from '@iconify/react';
import addBoxLine from '@iconify/icons-ri/add-box-line';
import checkboxIndeterminateLine from '@iconify/icons-ri/checkbox-indeterminate-line';
import deleteBin5Line from '@iconify/icons-ri/delete-bin-5-line';
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

export type Props = {
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

const CartProduct: React.FC<Props & ICurrencyState> = ({ item, currency }) => {
    const { amount, product } = item;

    const { extractImgs } = useAllProductImages();
    const dispatch = useDispatch();

    const { xs, s }: any = extractImgs(product, false);

    // img sources gatsby image.

    // handle add and handle rmove => which one to add / remove?

    // const handleAdd = () => {
    //     dispatch(addToCart(product));
    // };

    // const handleRemove = () => {
    //     dispatch(removeFromCart(product, 1));
    // };

    // option to remove the product from cart.
    const handleRemoveAll = () => {
        dispatch(removeFromCart(product, false, amount));
    };

    // destructure attrs needed.
    const {
        prices: { idrPrice, ausPrice, discountPercentage },
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
                my={[3]}
                py={[2]}
                css={`
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                `}
            >
                <Img fixed={sources} />
                <Box ml={[5]}>
                    <Text
                        fontFamily="heading"
                        fontSize={[2, 2, 3]}
                        fontWeight="bold"
                    >
                        {product.name}
                    </Text>
                    <Flex
                        alignItems="center"
                        css={`
                            .cart-icons {
                                height: 16px;
                                width: 16px;
                            }
                        `}
                    >
                        <Text
                            fontFamily="heading"
                            fontSize={[2, 2, 3]}
                            fontWeight="bold"
                        >
                            qty: {amount}
                        </Text>
                        {/* <Flex variant="center" ml={[3]} onClick={handleRemove}>
                            <Icon
                                className="cart-icons"
                                icon={checkboxIndeterminateLine}
                            />
                        </Flex> */}
                        {/* <Flex variant="center" ml={[1]} onClick={handleAdd}>
                            <Icon className="cart-icons" icon={addBoxLine} />
                        </Flex> */}
                    </Flex>
                    <Text
                        fontFamily="body"
                        fontSize={[2, 2, 3]}
                        fontWeight="body"
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
                </Box>
                <Flex
                    variant="center"
                    ml="auto"
                    css={`
                        & > svg {
                            height: 24px;
                            width: 24px;
                        }
                    `}
                    onClick={handleRemoveAll}
                >
                    <Icon icon={deleteBin5Line} />
                </Flex>
            </Flex>
        );
    }

    return null;
};

export { CartProduct };
