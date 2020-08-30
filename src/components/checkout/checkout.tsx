import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@reach/router';

import initPayment from 'helper/payment';
import { Order } from 'helper/schema/order';
import { IState as ICartState } from 'state/reducers/cart-reducer';
import Form from './form';
import { clearCart } from 'state/actions/cart';

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

const Checkout: React.FC<Props> = ({ db, user, cartObj: { cart } }) => {
    const [userData, setUserData] = useState<
        (UserData & UserLocation) | undefined
    >(undefined);
    const [shippingVariants, setShippingVariants] = useState<ShippingVars[]>(
        []
    );
    const [shipping, setShipping] = useState<Shipping | undefined>(undefined);
    const [totalPrice, setTotalPrice] = useState(0);

    const [errorShipping, setErrorShipping] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const msgErrorShipping = 'Please choose a shipping method';
    const price: number = cart.reduce(
        (acc, current) => current.amount * current.product.idrPrice + acc,
        0
    );

    useEffect(() => {
        if (shipping) {
            setTotalPrice(price + shipping.value);
        }
    }, [shipping]);

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

    // orderid -> document id on firestore order collection
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

    // calculate shipping cost -> shipping cost fetched from rajaongkir api.
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

    // simple user form for getting required informations
    const getUserData = (data: UserData & UserLocation, origin: number) => {
        setUserData(data);
        calculateShippingCost(data, origin);
    };

    // pay here
    const handleClickPay = async () => {
        // TODO: check for auth.
        const oid = await generateOrderId();
        // interact with 3rd party api for payment.
        if (userData && shipping) {
            const successTransaction = await initPayment(
                price,
                userData.name,
                userData.phone.toString(),
                userData.email,
                oid,
                'cstore',
                'indomaret',
                true // debug
            );

            const { success } = await successTransaction;
            if (success) {
                // create new order object
                createOrder(oid);
            } else {
                // handle error
                console.log('s');
            }
        } else if (!shipping) {
            setErrorShipping(true);
        }
    };

    // create new order object
    const createOrder = async (oid: string) => {
        if (userData) {
            try {
                const docRef = db.collection('order').doc(oid);

                const order: Order = {
                    oid,
                    buyerName: userData.name,
                    buyerEmail: userData.email,
                    buyerPhone: userData.phone,
                    buyerUId: user ? user.uid : 'admin',
                    buyerAddr: userData.address,
                    buyerPostal: userData.postal,

                    total: totalPrice,
                    fee: 0, // got from payment gateway
                    currency: 'IDR', // temporary
                    date: new Date(),
                    products: cart.map(cartItem => ({
                        pid: cartItem.product.pid,
                        amount: cartItem.amount,
                    })),
                    paid: false,
                    delivered: false,
                };

                await docRef.set({
                    ...order,
                });

                await dispatch(clearCart());
                await navigate('/'); // navigate to thank you page and use oid state!
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleChangeShipping = (variant: ShippingVars) => {
        if (errorShipping) {
            setErrorShipping(false);
        }
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
            {errorShipping && <p>{msgErrorShipping} </p>}
            <h2>Price: IDr {formatPrice(price)}</h2>
            {shipping && shipping.value ? (
                <>
                    <h2>Shipping cost: {formatPrice(shipping.value)}</h2>
                    <h1>Subtotal: {formatPrice(totalPrice)}</h1>
                </>
            ) : (
                <></>
            )}
            {userData && <button onClick={handleClickPay}>Pay</button>}
            {/* handle unclickable if shipping hasn't been selected */}
        </>
    );
};

export { Checkout };
