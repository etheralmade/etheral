import React from 'react';
import { Link } from '@reach/router';
import { flatten } from 'lodash';

import { Box, Text, Button, Flex, Heading } from 'rebass';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import CartProduct from './cart-product';
import Modal from 'components/modal';

type Props = {
    cart: ICartState;
    closeCart: () => void;
};

/**
 * The "real" cart copmonent (where the in-cart products are being displayed.)
 * @param param0
 */
const CartItems: React.FC<Props> = ({ cart: { cart } }) => {
    const cartMapped = cart.map(item => {
        const notes = item.note.map(o => ({ ...item, ...o, note: undefined }));

        return notes;
    });

    const data = flatten(cartMapped);

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
                <Box>
                    {data.map(ctItem => (
                        <CartProduct
                            key={`cart-${ctItem.product.pid}`}
                            item={ctItem}
                        />
                    ))}
                </Box>

                {/* buttons */}
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
