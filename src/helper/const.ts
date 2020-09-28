import { Product } from './schema/product';
import { Order } from './schema/order';
import { Blog } from './schema/blog';
import { Currencies } from 'state/reducers/currency-reducer';

export const mockProduct1: Product = {
    pid: '1234',
    name: 'Mock product',
    slug: 'ctg1/product1',
    category: 'ctg1',
    productDetails: '<p>Good product</p>',
    description: 'Just a mock product',
    prices: {
        idrPrice: 23000,
        ausPrice: 21,
        discountPercentage: 10,
    },
    gems: {
        withGems: true,
        gemTypes: 'A, B',
        gemSizes: 'S, M, L',
    },
    availableSizes: 'S, M, L',
    collection: 'fall',
    productImages: [],
    urls: [],
    weight: 20,
    amount: 12,
    relatedProducts: [],
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
    currency: Currencies.IDR,
    date: new Date(),
    via: 'va',
    channel: 'bni',
    products: [
        {
            pid: mockProduct1.pid,
            amount: 12,
            discountPercentage: 10,
            note: [
                {
                    details: {
                        size: 'S',
                    },
                    amount: 12,
                },
            ],
        },
    ],
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
        shippingDate: new Date(),
        trackingNum: '12342',
        shippedBy: 'admin1',
    },
};

export const mockBlog: Blog = {
    content:
        '<h1 role="heading">Hello World!</h1><br /><img src="" alt="empty image" />',
    summary: 'Mock summary',
    title: 'Mock title',
    date: new Date(Date.parse('2020-09-11T00:00:00+02:00')),
    slug: 'sample-blog-post',
};

export const nameToSlug = (name: string) =>
    name
        .toLowerCase()
        .split(' ')
        .join('-');
