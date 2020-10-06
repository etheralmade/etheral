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
    const data = [...flatten(cartMapped)].sort((a, b) => {
        // check by name
        const ab = a.product.name > b.product.name;

        if (ab) {
            return ab;
        } else if (a.product.name < b.product.name) {
            // make sure a and b is not the same
            return ab;
        }

        // then check the other props if a and b is the same
        const abSize = a.details.size > b.details.size;

        if (abSize) {
            return abSize;
        } else if (a.details.size < b.details.size) {
            return false;
        }

        if (a.details.gemType && b.details.gemType) {
            // iterate
            const abType = a.details.gemType > b.details.gemType;

            if (abType) {
                return abType;
            } else if (a.details.gemType < b.details.gemType) {
                return false;
            }
        }

        if (a.details.gemSize && b.details.gemSize) {
            // return gemsize comparasion if all of the other properties are the same.
            return a.details.gemSize > b.details.gemSize;
        }

        return false;
    });

    console.log(data);

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
                        <ProductBox
                            key={`cart-${ctItem.product.pid}-${JSON.stringify(
                                ctItem.details
                            )}`}
                            item={ctItem}
                            currency={currency}
                            connectDispatch={true}
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
