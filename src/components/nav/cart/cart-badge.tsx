import React from 'react';

import { Text } from 'rebass';
import { IState as ICartState } from 'state/reducers/cart-reducer';

type Props = ICartState;

/**
 * Simple badge to show how many products is in the cart.
 */
const CartBadge: React.FC<Props> = ({ cart }) => {
    const length = cart.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <Text fontSize={[1, 2, 2]} fontFamily="heading">
            {length}
        </Text>
    );
};

export default CartBadge;
