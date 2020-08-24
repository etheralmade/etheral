import { FixedObject, FluidObject } from 'gatsby-image';

export interface Product {
    name: string;
    pid: string;
    amount: number;
    description?: string;
    category?: string;
    idrPrice?: number;
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
}
