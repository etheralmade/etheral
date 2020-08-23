export interface Product {
    name: string;
    pid: string;
    description?: string;
    category?: string;
    idrPrice?: number;
    image?: string;
    amount: number;
    availableSizes?: string[];
    collection?: string;
}
