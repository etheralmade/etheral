import { InCart as ProductWithAmount } from './firebase-user';

export interface Order {
    // generated for inner system
    oid: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: number;
    buyerUId?: string;
    buyerAddr: string;
    buyerPostal: number;
    // generated from ipaymu!
    total: number;
    fee: number;
    currency: 'IDR' | 'AUD';
    ipaymuTId?: string;
    date: Date;
    via?: string;
    channel?: string;
    paymentNo?: number;
    products: ProductWithAmount[];

    paid: boolean;
    delivered: boolean;
}
