import React, { useState } from 'react';
import { LinkedList } from 'linked-list-typescript';

import { Product } from 'helper/schema/product';

export type Props = {};

const Cart: React.FC<Props> = props => {
    const [cart, setCart] = useState();

    console.log({ cart });
    console.log(props.cart);

    return <></>;
};

export { Cart };
