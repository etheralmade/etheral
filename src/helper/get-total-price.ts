import { Product } from 'helper/schema';
import { withDiscount } from './with-discount';

type HelperArgs = {
    [key: string]: any;
    amount: number;
    product: Product;
}[];

const getTotalPriceIdr = (args: HelperArgs) => {
    return args.reduce((acc, curr) => {
        const { amount, product } = curr;

        // destructure prices prop
        const {
            prices: { discountPercentage, idrPrice },
        } = product;

        // get price.
        const price =
            discountPercentage > 0
                ? withDiscount(idrPrice, discountPercentage)
                : idrPrice;

        return acc + amount * price;
    }, 0);
};

const getTotalPriceAud = (args: HelperArgs) => {
    return args.reduce((acc, curr) => {
        const { amount, product } = curr;

        // destructure prices prop
        const {
            prices: { discountPercentage, ausPrice },
        } = product;

        // get price.
        const price =
            discountPercentage > 0
                ? withDiscount(ausPrice, discountPercentage)
                : ausPrice;

        return acc + amount * price;
    }, 0);
};

export { getTotalPriceIdr, getTotalPriceAud };
