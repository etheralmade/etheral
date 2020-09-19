import React from 'react';
import { Link } from '@reach/router';

import { Box, Text, Button, Flex } from 'rebass';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import CartProduct from './cart-product';

type Props = {
    cart: ICartState;
};

const CartItems: React.FC<Props> = ({ cart: { cart } }) => {
    return (
        <Flex
            height={['92vh', '92vh', 'fit-content']}
            maxHeight={['92vh', '92vh', '50vh']}
            width={['100vw', '100%', '50vw', '25vw']}
            pt={[4, 4, 5]}
            pb={[4, 4, 5]}
            px={[6, 6, 8]}
            flexDirection="column"
            id="cart"
            bg={['#fff']}
            css={`
                position: absolute;
                left: 0;
                top: 10vh;
                z-index: 2;

                overflow-y: scroll;

                @media (min-width: 48em) {
                    top: 12vh;
                    left: auto;
                    right: 0;
                }

                @media screen and (min-width: 64em) {
                    right: 10vw;
                }
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
        </Flex>
    );
};

export { CartItems };
