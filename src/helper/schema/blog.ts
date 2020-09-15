import { FluidObject, FixedObject } from 'gatsby-image';

export interface Blog {
    content: string;
    date: Date;
    summary: string;
    title: string;
    image?: {
        childImageSharp: {
            fixed?: FixedObject[] | FixedObject;
            fluid?: FluidObject[] | FluidObject;
        };
    };
}
