import { Product } from 'helper/schema';
import { withDiscount } from './with-discount';
import { Currencies } from 'state/reducers/currency-reducer';

type HelperArgs = {
    [key: string]: any;
    amount: number;
    product: Product;
};

const getTotalPriceIdr = (args: HelperArgs[]) => {
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

const getTotalPriceAud = (args: HelperArgs[]) => {
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

/**
 * function to get price (formatted ?) based on currency
 * @param args product name and prices + its discount percentage.
 * @param currency current currency state
 */
const getPrice = (args: HelperArgs, currency: Currencies) => {
    const {
        product: { prices },
        amount,
    } = args;

    const { discountPercentage, idrPrice, ausPrice } = prices;

    // handle IDR.
    if (currency === Currencies.IDR) {
        const price =
            discountPercentage > 0
                ? withDiscount(idrPrice, discountPercentage)
                : idrPrice;

        return amount * price;
    } else {
        const price =
            discountPercentage > 0
                ? withDiscount(ausPrice, discountPercentage)
                : ausPrice;

        return amount * price;
    }
};

export { getTotalPriceIdr, getTotalPriceAud, getPrice };
