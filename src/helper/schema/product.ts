export interface Product {
    name: string;
    pid: string;
    amount: number;

    description?: string;
    category?: string;
    idrPrice?: number;
    image?: string;
    availableSizes?: string[];
    collection?: string;
}
