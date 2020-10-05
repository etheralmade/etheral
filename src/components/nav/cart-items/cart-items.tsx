import React from 'react';
import { Link } from '@reach/router';
import { flatten } from 'lodash';

import { Box, Text, Button, Flex, Heading } from 'rebass';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import {
    IState as ICurrencyState,
    Currencies,
} from 'state/reducers/currency-reducer';
import CartProduct from './cart-product';
import Modal from 'components/modal';
import { getTotalPriceIdr, getTotalPriceAud } from 'helper/get-total-price';

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

    const data = flatten(cartMapped);

    const subtotal =
        currency === Currencies.IDR
            ? `IDR ${getTotalPriceIdr(data)}`
            : `AUD ${getTotalPriceAud(data)}`;

    return (
        <Modal>
            <Flex
                height="100vh"
                width="fit-content"
                flexDirection="column"
                bg="#fff"
                sx={{ top: 0, right: 0, position: 'fixed' }}
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
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: 'black.1',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                    }}
                >
                    {data.map(ctItem => (
                        <CartProduct
                            key={`cart-${ctItem.product.pid}-${JSON.stringify(
                                ctItem.details
                            )}`}
                            item={ctItem}
                            currency={currency}
                        />
                    ))}
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
                        <Button width="100%" my={[4]}>
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
                        sx={{ textDecoration: 'underline' }}
                    >
                        Continue Shopping
                    </Text>
                </Box>
            </Flex>
        </Modal>
    );
};

{
    /* <Flex
                className="custom-scrollbar"
                height="100vh"
                width={['100vw', '100%', '50vw', '35vw', '25vw']}
                pt={[4, 4, 5]}
                pb={[4, 4, 5]}
                px={[6, 6, 8]}
                flexDirection="column"
                id="cart"
                bg={['#fff']}
                css={`
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 2;
                    transition: 0.2s;

                    overflow-y: scroll;
                `}
            >
                {cart.length > 0 ? (
                    <>
                        <Link to="cart">
                            <Text variant="linkActive">My cart</Text>
                        </Link>
                        <Flex
                            height="90%"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Box>
                                {cart.map(ctItem => (
                                    <CartProduct
                                        key={`cart-${ctItem.product.pid}`}
                                        item={ctItem}
                                    />
                                ))}
                            </Box>
                            <Link
                                to="/checkout"
                                css={`
                                    display: inline-block;
                                    width: 100%;
                                `}
                            >
                                <Button mt={[2, 2, 4]} width="100%">
                                    Go to checkout
                                </Button>
                            </Link>
                        </Flex>
                    </>
                ) : (
                    <Text variant="linkActive">
                        There&apos;s no item in your cart
                    </Text>
                )}
            </Flex> */
}

export { CartItems };
