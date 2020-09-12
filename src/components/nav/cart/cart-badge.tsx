import React from 'react';

import { Text } from 'rebass';
import { IState as ICartState } from 'state/reducers/cart-reducer';

type Props = ICartState & {
    showDropdown: boolean;
};

/**
 * Simple badge to show how many products is in the cart.
 */
const CartBadge: React.FC<Props> = ({ cart, showDropdown }) => {
    const length = cart.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <Text
            fontSize={[1, 2, 2]}
            fontFamily="heading"
            color={['#000', '#000', showDropdown ? '#000' : '#fff']}
        >
            {length}
        </Text>
    );
};

export default CartBadge;
