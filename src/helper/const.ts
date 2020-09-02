import { Product } from './schema/product';
import { Order } from './schema/order';

const mockProduct1: Product = {
    pid: '1234',
    name: 'Mock product',
    slug: 'ctg1/product1',
    category: 'ctg1',
    idrPrice: 23000,
    collection: 'fall',
    productImages: [],
    urls: [],
    weight: 20,
    amount: 12,
};

export const mockProducts: Product[] = [mockProduct1];

export const mockOrder: Order = {
    oid: 'asdadwda',
    buyerName: 'Jane Doe',
    buyerEmail: 'jane@doe',
    buyerPhone: 123412412,
    buyerUId: 'admin',
    buyerAddr: 'Storkowerstrasse',
    buyerPostal: 1234143,
    total: 32000,
    currency: 'IDR',
    date: new Date(),
    via: 'va',
    channel: 'bni',
    products: [{ pid: mockProduct1.pid, amount: 12 }],
    paid: false,
    delivered: false,
    transactionData: {
        sessionId: '1234',
        paymentNo: '12',
        paymentName: 'Jane Doe - BNI',
        expired: '1231241412',
        fee: 3000,
    },
    shippingMethod: 'OKE',
};

export const mockOrders: Order[] = [mockOrder];

export const mockOrderShipped: Order = {
    ...mockOrder,
    delivered: true,
    shippingData: {
        shippedDate: new Date(),
        trackingCode: '12342',
        shippedBy: 'admin1',
    },
};
