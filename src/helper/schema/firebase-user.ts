import { ProductNote } from 'state/reducers/cart-reducer';

export type InCart = {
    pid: string;
    amount: number;
    note: { details: ProductNote; amount: number }[];
};

export type Order = {
    oid: string;
    date: Date;
};

export interface FirebaseUserData {
    name: string;
    email: string;
    inCart: InCart[];
    orders: Order[];
}
