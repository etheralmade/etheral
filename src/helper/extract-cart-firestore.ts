import { intersectionBy } from 'lodash';

import { SetCartArgs } from 'state/actions/cart';
import { InCart } from './schema/firebase-user';
import { Product } from './schema/product';

export default ({
    firestoreCartData,
    allProducts,
}: {
    firestoreCartData: InCart;
    allProducts: Product[];
}): SetCartArgs => {
    const inCartProduct = intersectionBy(allProducts, firestoreCartData, 'pid');
    return inCartProduct.map(product => ({
        product,
        amount: intersectionBy(firestoreCartData, [product], 'pid')[0].amount, // get the intersection between the product -> pid is unique, so the function is guaranteed to return one item.
    }));
};
