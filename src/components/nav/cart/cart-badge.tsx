import React from 'react';

import { Flex } from 'rebass';

type Props = {
    length: number;
};

const CartBadge: React.FC<Props> = ({ length }) => {
    return <Flex>{length}</Flex>;
};

export default CartBadge;
