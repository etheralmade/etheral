import React from 'react';
import { Link } from '@reach/router';
import { flatten } from 'lodash';

import { Box, Text, Button, Flex, Heading } from 'rebass';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import {
    IState as ICurrencyState,
    Currencies,
} from 'state/reducers/currency-reducer';
// import CartProduct from './cart-product';
import Modal from 'components/modal';
import { getTotalPriceIdr, getTotalPriceAud } from 'helper/get-total-price';
import ProductBox from 'components/product-box';

export type Props = {
    cart: ICartState;
    closeCart: () => void;
};

/**
 * The "real" cart copmonent (where the in-cart products are being displayed.)
 * @param param0
 */
const CartItems: React.FC<ICurrencyState & Props> = ({
    cart: { cart },
    currency,
    closeCart,
}) => {
    const cartMapped = cart.map(item => {
        const notes = item.note.map(o => ({ ...item, ...o, note: undefined }));

        return notes;
    });

    /**
     * sorting the mapped data => avoid unconsistent order of items on cart component
     */
    const data = flatten(cartMapped);

    const subtotal =
        currency === Currencies.IDR
            ? `IDR ${getTotalPriceIdr(data)}`
            : `AUD ${getTotalPriceAud(data)}`;

    return (
        <Modal>
            <Flex
                height="100vh"
                flexDirection="column"
                bg="#fff"
                width={[300, 340, 400]}
                sx={{
                    top: 0,
                    right: 0,
                    position: 'fixed',
                }}
            >
                {/* cart text */}
                <Heading
                    width="100%"
                    textAlign="center"
                    as="h3"
                    variant="h4"
                    py={[6]}
                    // fontSize={[1]}
                    sx={{}}
                >
                    CART
                </Heading>

                {/* cart prodcuts */}
                <Box
                    height="100%"
                    className="custom-scrollbar"
                    sx={{
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: 'black.1',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        display: cart.length === 0 ? 'flex' : 'unset',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {data.map(ctItem => (
                        <ProductBox
                            key={`cart-${ctItem.product.pid}-${JSON.stringify(
                                ctItem.details
                            )}`}
                            item={ctItem}
                            currency={currency}
                            connectDispatch={true}
                        />
                    ))}
                    {data.length === 0 && (
                        <Text variant="h4" fontFamily="heading">
                            YOUR CART IS EMPTY
                        </Text>
                    )}
                </Box>

                {/* buttons */}
                <Box width="100%" px={[6]} py={[6]}>
                    {/* total price. */}
                    <Flex justifyContent="space-between">
                        <Text variant="h4" fontFamily="heading">
                            TOTAL
                        </Text>
                        <Text variant="h4">{subtotal}</Text>
                    </Flex>

                    {/* checkout button */}
                    <Link
                        to="/checkout"
                        css={`
                            width: 100%;
                        `}
                    >
                        <Button
                            width="100%"
                            my={[4]}
                            disabled={cart.length === 0}
                        >
                            CHECKOUT
                        </Button>
                    </Link>

                    {/* exit cart button */}
                    <Text
                        role="button"
                        onClick={closeCart}
                        fontWeight="body"
                        fontFamily="body"
                        fontSize={[10]}
                        color="black.1"
                        textAlign="center"
                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        Continue Shopping
                    </Text>
                </Box>
            </Flex>
        </Modal>
    );
};

export { CartItems };
