export interface Collection {
    name: string;
    description: string;
    // release date in timestamp.
    releaseDate?: Date;
    collectionPromotionalImages: string[];
    cid: string;
}
