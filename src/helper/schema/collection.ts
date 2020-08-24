import { FixedObject, FluidObject } from 'gatsby-image';

export interface Collection {
    name: string;
    description: string;
    // release date in timestamp.
    releaseDate?: Date;
    collectionPromotionalImages: string[];
    cid: string;
    collectionImages: {
        childImageSharp: {
            fixed?: FixedObject[] | FixedObject;
            fluid?: FluidObject[] | FluidObject;
        };
    }[];
}
