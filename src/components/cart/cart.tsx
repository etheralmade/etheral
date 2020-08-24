import React, { useState } from 'react';
import { LinkedList } from 'linked-list-typescript';

import { Product } from 'helper/schema/product';

type Props = {};

const Cart: React.FC<Props> = props => {
    const linkedList = new LinkedList<Product>();
    const [cart, setCart] = useState(linkedList);

    console.log({ cart });

    return <></>;
};

export { Cart };
