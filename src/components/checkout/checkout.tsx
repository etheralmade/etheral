import React, { useState } from 'react';

import initPayment from 'helper/payment';
import { IState as ICartState } from 'state/reducers/cart-reducer';
import Form from './form';

type Props = {
    db: firebase.firestore.Firestore;
    user: firebase.User | null;
    cartObj: ICartState;
};

export type UserData = {
    name: string;
    email: string;
    phone: number;
    address: string;
    postal: number;
};

export type UserLocation = {
    cityId: number;
    provinceId: number;
};

const Checkout: React.FC<Props> = ({ db, cartObj: { cart } }) => {
    const [userData, setUserData] = useState<
        (UserData & UserLocation) | undefined
    >(undefined);

    const price: number = cart.reduce(
        (acc, current) => current.amount * current.product.idrPrice + acc,
        0
    );

    // basic formatting.
    const formatPrice = (priceUnformatted: number): string => {
        const matchPriceRegex = priceUnformatted
            .toString()
            .match(/.{1,3}(?=(.{3})+(?!.))|.{1,3}$/g);

        if (matchPriceRegex !== null) {
            return matchPriceRegex.join('.');
        } else {
            return priceUnformatted.toString();
        }
    };

    const generateUniqueId = () =>
        Math.random()
            .toString(36)
            .substr(2, 8);

    const generateOrderId = async (): Promise<string> => {
        const oid = `${generateUniqueId()}${generateUniqueId()}`;
        const ref = db.collection('order').doc(oid);

        try {
            const doesExist = await ref.get().then(doc => doc.exists);
            if (await doesExist) {
                return generateOrderId(); // recursively calls itself if document exists -> regenerate id.
            } else {
                return oid;
            }
        } catch (e) {
            console.error(e);
            return generateOrderId(); // recursively calls itself on error -> regenerate id.
        }
    };

    const generateOrderObject = () => {
        return;
    };

    const calculateShippingCost = async (
        {
            cityId,
        }: {
            cityId: number;
        },
        origin: number
    ) => {
        try {
            const headers = new Headers();
            headers.append('key', process.env.GATSBY_RAJA_ONGKIR_KEY || '');
            headers.append('origin', origin.toString());
            headers.append('destination', cityId.toString());
            headers.append(
                'weight',
                cart
                    .reduce((acc, current) => current.product.weight + acc, 0)
                    .toString()
            );
            headers.append('courier', 'jne');

            console.log(
                cart.reduce((acc, current) => current.product.weight + acc, 0)
            );

            console.log(headers.get('weight'));
            console.log(headers.get('key'));
            console.log(headers.get('origin'));
            console.log(headers.get('destination'));

            const req = await fetch('https://api.rajaongkir.com/starter/city', {
                method: 'GET',
                mode: 'no-cors',
                headers,
            });

            const rsp = await req.json();
        } catch (e) {
            console.error(e);
        }
    };

    const getUserData = (data: UserData & UserLocation, origin: number) => {
        setUserData(data);
        calculateShippingCost(data, origin);
    };

    // pay here
    const handleClickPay = async () => {
        // TODO: check for auth.
        const oid = await generateOrderId();
        // interact with 3rd party api for payment.
        const successTransaction = await initPayment(
            price,
            'Louis',
            '081999501092',
            'eaa@gmail.com',
            oid,
            'cstore',
            'indomaret',
            true // debug
        );

        const { success } = await successTransaction;
        if (success) {
            // create new order object
            console.log(`generating order, oid: ${oid}`);
        } else {
            // handle error
            console.log('s');
        }
    };

    console.log(userData);

    return (
        <>
            <Form getUserData={getUserData} />
            <h2>Price: IDr {formatPrice(price)}</h2>
            <button onClick={handleClickPay}>Pay</button>
        </>
    );
};

export { Checkout };
