import React, { useState } from 'react';
import axios from 'axios';
import { get } from 'lodash';

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

// got from rajaongkir api
type ShippingVars = {
    cost: Shipping[];
    service: string;
    description: string;
};

type Shipping = {
    etd: string;
    value: number;
};
// end of rajaongir api types

const Checkout: React.FC<Props> = ({ db, cartObj: { cart } }) => {
    const [userData, setUserData] = useState<
        (UserData & UserLocation) | undefined
    >(undefined);
    const [shippingVariants, setShippingVariants] = useState<ShippingVars[]>(
        []
    );
    const [shipping, setShipping] = useState<Shipping | undefined>(undefined);

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

    // const generateOrderObject = () => {
    //     return;
    // };

    const calculateShippingCost = async (
        {
            cityId,
        }: {
            cityId: number;
        },
        origin: number
    ) => {
        try {
            const data = {
                origin,
                destination: cityId,
                weight: cart.reduce(
                    (acc, current) => current.product.weight + acc,
                    0
                ),
                courier: 'jne',
            };

            const url =
                process.env.NODE_ENV === 'production'
                    ? '/.netlify/functions/get-shipping-cost' // cloud function.
                    : '/starter/cost';

            const req = await axios.post(url, data, {
                headers: {
                    key: process.env.GATSBY_RAJA_ONGKIR_KEY || '',
                },
            });

            const rsp = await req.data;
            const { rajaongkir } = await rsp;
            const statusCode = await get(rajaongkir, 'status.code', 400);
            // status code is OK.
            if (statusCode < 299) {
                const rspVariants = (await get(
                    rajaongkir,
                    'results[0].costs',
                    []
                )) as ShippingVars[];

                await setShippingVariants(rspVariants);
            }
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
        if (userData) {
            const successTransaction = await initPayment(
                price,
                userData.name,
                userData.phone.toString(),
                userData.email,
                oid,
                'cstore',
                'indomaret',
                false // debug
            );

            const { success } = await successTransaction;
            if (success) {
                // create new order object
                console.log(`generating order, oid: ${oid}`);
            } else {
                // handle error
                console.log('s');
            }
        }
    };

    const handleChangeShipping = (variant: ShippingVars) => {
        setShipping(variant.cost[0]);
    };

    return (
        <>
            <Form getUserData={getUserData} />

            {shippingVariants.length > 0 &&
                shippingVariants.map(variant => (
                    <React.Fragment key={variant.service}>
                        <label htmlFor={variant.service}>
                            {variant.description} ({variant.service}).
                            <br />
                            Harga: {variant.cost[0].value}
                            Etd: {variant.cost[0].etd}
                        </label>
                        <input
                            name="shipping"
                            type="radio"
                            value={variant.service}
                            onChange={() => handleChangeShipping(variant)}
                        />
                    </React.Fragment>
                ))}
            <h2>Price: IDr {formatPrice(price)}</h2>
            {shipping && shipping.value ? (
                <>
                    <h2>Shipping cost: {formatPrice(shipping.value)}</h2>
                    <h1>Subtotal: {formatPrice(price + shipping.value)}</h1>
                </>
            ) : (
                <></>
            )}
            <button onClick={handleClickPay}>Pay</button>
        </>
    );
};

export { Checkout };
