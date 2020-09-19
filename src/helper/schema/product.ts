import { FixedObject, FluidObject } from 'gatsby-image';

export interface Product {
    name: string;
    pid: string;
    amount: number;
    // gatsby linking param
    slug: string;
    description?: string;
    category?: string;
    idrPrice: number;
    ausPrice: number;
    usdPrice: number;
    discountPercentage: number;
    availableSizes?: {
        S: boolean;
        M: boolean;
    };
    collection?: string;
    productImages: {
        childImageSharp: {
            fixed?: FixedObject[] | FixedObject;
            fluid?: FluidObject[] | FluidObject;
        };
    }[];
    urls: string[];
    weight: number;
}
