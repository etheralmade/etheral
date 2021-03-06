import { FixedObject, FluidObject } from 'gatsby-image';
import { ProductNote } from 'state/reducers/cart-reducer';

export interface Product {
    name: string;
    pid: string;
    amount: number;
    // gatsby linking param
    slug: string;
    description: string;
    productDetails: string;
    category: string;
    prices: {
        idrPrice: number;
        ausPrice: number;
        discountPercentage: number;
    };
    gems: {
        withGems: boolean;
        gemTypes: string;
        gemSizes: string;
    };
    availableSizes: string;
    collection: string;
    productImages: {
        childImageSharp: {
            fixed?: FixedObject[] | FixedObject;
            fluid?: FluidObject[] | FluidObject;
        };
    }[];
    urls: string[];
    weight: number;
    relatedProducts: string[];
    orderNote?: ProductNote;
}
