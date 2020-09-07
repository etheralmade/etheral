import React from 'react';

import { Text, Box } from 'rebass';

type Props = {
    length: number;
};

/**
 * Simple badge to show how many products is in the cart.
 */
const CartBadge: React.FC<Props> = ({ length }) => {
    return (
        <Text fontSize={[1, 2, 2]} fontFamily="heading">
            {length}
        </Text>
    );
};

export default CartBadge;
