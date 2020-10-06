import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@reach/router';

import { Box, Text } from 'rebass';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import Form from './form';
import { clearCart } from 'state/actions/cart';
import { Order, IpaymuData } from 'helper/schema/order';
import { Currencies } from 'state/reducers/currency-reducer';
import { withDiscount } from 'helper/with-discount';
import DiscountCodeInput from './discount-code-input';
import ProductsSummary from './products-summary';

type Props = {
    db: firebase.firestore.Firestore;
    user: firebase.User | null;
    cartObj: ICartState;
    currency: Currencies;
    firestoreFieldValue: { increment: any; arrayUnion: any };
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
    cost: ShippingCost[];
    service: string;
    description: string;
};

type ShippingCost = {
    etd: string;
    value: number;
};

type Shipping = {
    value: number;
    service: string;
};
// end of rajaongir api types

const Checkout: React.FC<Props> = ({
    db,
    user,
    firestoreFieldValue,
    currency,
    cartObj: { cart, wishlist },
}) => {
    // state for prices based on currency
    const [price, setPrice] = useState(0);
    const [currencyPrefix, setCurrencyPrefix] = useState(Currencies.IDR);

    const [userData, setUserData] = useState<
        (UserData & UserLocation) | undefined
    >(undefined);
    const [shippingVariants, setShippingVariants] = useState<ShippingVars[]>(
        []
    );
    const [shipping, setShipping] = useState<Shipping | undefined>(undefined);
    const [totalPrice, setTotalPrice] = useState(0);

    const [discountCode, setDiscountCode] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [discountedAmount, setDiscountedAmount] = useState(0);

    const [errorShipping, setErrorShipping] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const msgErrorShipping = 'Please choose a shipping method';

    const discounted = discountCode !== '' && discountValue !== 0;

    // price is based on global currency.
    useEffect(() => {
        // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
        let temp: number;

        switch (currency) {
            case Currencies.IDR:
                temp = cart.reduce(
                    (acc, curr) =>
                        (curr.product.prices.discountPercentage > 0
                            ? withDiscount(
                                  curr.product.prices.idrPrice,
                                  curr.product.prices.discountPercentage
                              )
                            : curr.product.prices.idrPrice) *
                            curr.amount +
                        acc,
                    0
                );
                setPrice(temp);
                setCurrencyPrefix(Currencies.IDR);
                break;
            case Currencies.AUD:
                temp = cart.reduce(
                    (acc, curr) =>
                        (curr.product.prices.discountPercentage > 0
                            ? withDiscount(
                                  curr.product.prices.ausPrice,
                                  curr.product.prices.discountPercentage
                              )
                            : curr.product.prices.ausPrice) *
                            curr.amount +
                        acc,
                    0
                );
                setPrice(temp);
                setCurrencyPrefix(Currencies.AUD);
                break;
            default:
                temp = cart.reduce(
                    (acc, curr) =>
                        (curr.product.prices.discountPercentage > 0
                            ? withDiscount(
                                  curr.product.prices.idrPrice,
                                  curr.product.prices.discountPercentage
                              )
                            : curr.product.prices.idrPrice) *
                            curr.amount +
                        acc,
                    0
                );
                setPrice(temp);
                setCurrencyPrefix(Currencies.IDR);
                break;
        }
    }, [currency]);

    // update price if discount code is applied.
    useEffect(() => {
        if (discounted) {
            setDiscountedAmount((discountValue / 100) * price);
            setPrice(withDiscount(price, discountValue));
        }
    }, [discountCode, discountValue]);

    useEffect(() => {
        if (shipping) {
            setTotalPrice(price + shipping.value);
        }
    }, [price, shipping]);

    // basic formatting.
    const formatPriceIDR = (priceUnformatted: number): string => {
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
    // calclulate shipping cost within ID.
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
        // add production payment url here!
        const paymentUrl =
            process.env.NODE_ENV === 'production' ? '' : '/payment/';

        const oid = await generateOrderId();
        // interact with 3rd party api for payment.
        if (userData && shipping) {
            const bodyReq = await {
                name: userData.name,
                phone: userData.phone.toString(),
                email: userData.email,
                amount: totalPrice,
                paymentMethod: 'va',
                paymentChannel: 'bni',
                oid,
            };

            const req = await axios.post(paymentUrl, bodyReq);

            const { status, data } = await req;

            if ((await status) < 299) {
                const {
                    SessionId,
                    PaymentNo,
                    PaymentName,
                    Expired,
                    Fee,
                } = data;

                const ipaymuData: IpaymuData = {
                    sessionId: SessionId,
                    paymentNo: PaymentNo,
                    paymentName: PaymentName,
                    expired: Expired,
                    fee: Fee,
                };

                // create new order object
                createOrder(oid, ipaymuData);
            } else {
                // handle error
                console.log('s');
            }
        } else if (!shipping) {
            setErrorShipping(true);
        }
    };

    // create new order object
    const createOrder = async (oid: string, ipaymuData: IpaymuData) => {
        if (userData) {
            try {
                const docRef = db.collection('order').doc(oid);
                const { increment, arrayUnion } = firestoreFieldValue;

                const decrement = (num: number) => increment(-1 * num);

                const order: Order = {
                    oid,
                    buyerName: userData.name,
                    buyerEmail: userData.email,
                    buyerPhone: userData.phone,
                    buyerUId: user ? user.uid : 'admin',
                    buyerAddr: userData.address,
                    buyerPostal: userData.postal,

                    total: totalPrice,
                    currency: Currencies.IDR, // temporary
                    date: new Date(),
                    products: cart.map(cartItem => ({
                        pid: cartItem.product.pid,
                        amount: cartItem.amount,
                        discountPercentage:
                            cartItem.product.prices.discountPercentage,
                        note: cartItem.note,
                    })),
                    paid: false,
                    delivered: false,
                    transactionData: ipaymuData,
                    shippingMethod: shipping ? shipping.service : '',
                    discountCode,
                    discountedAmount,
                    discount: discountValue,
                };

                await docRef.set({
                    ...order,
                });

                // updating product amount here!
                await Promise.all(
                    cart.map(async cartItem =>
                        db
                            .collection('fl_content')
                            .doc(cartItem.product.pid)
                            .update({
                                amount: decrement(cartItem.amount),
                            })
                    )
                );

                // update user's firestore orders data.
                if (user) {
                    await db
                        .collection('user')
                        .doc(user.uid)
                        .update({
                            orders: arrayUnion(oid),
                        });
                }

                const { paymentNo, paymentName, expired } = ipaymuData;

                await dispatch(clearCart());
                await navigate('/thankyou', {
                    state: {
                        oid,
                        paymentNo,
                        paymentName,
                        expired,
                        totalPrice,
                    },
                }); // navigate to thank you page and use oid state!
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleChangeShipping = (variant: ShippingVars) => {
        if (errorShipping) {
            setErrorShipping(false);
        }
        setShipping({
            value: variant.cost[0].value,
            service: variant.service,
        });
    };

    const applyCode = (code: string, value: number) => {
        setDiscountCode(code);
        setDiscountValue(value);
    };

    return (
        <Box className="content" sx={{ textAlign: 'center' }}>
            <ProductsSummary
                currency={currency}
                cart={cart}
                wishlist={wishlist}
            />
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
            {!discounted ? (
                <DiscountCodeInput db={db} applyCode={applyCode} />
            ) : (
                <Box>
                    <Text>Discount code: {discountCode} is applied!</Text>
                    <Text>{discountValue}% off your purchase!</Text>
                </Box>
            )}
            <h2>
                Price: {currencyPrefix}{' '}
                {currency === Currencies.IDR ? formatPriceIDR(price) : price}
                {discounted && (
                    <Text>
                        -{currencyPrefix}{' '}
                        {currency === Currencies.IDR
                            ? formatPriceIDR(discountedAmount)
                            : discountedAmount}
                    </Text>
                )}
            </h2>
            {shipping && shipping.value ? (
                <>
                    <h2>
                        Shipping cost:{' '}
                        {currency === Currencies.IDR
                            ? formatPriceIDR(shipping.value)
                            : shipping.value}
                    </h2>
                    <h1>
                        Subtotal:{' '}
                        {currency === Currencies.IDR
                            ? formatPriceIDR(totalPrice)
                            : totalPrice}
                    </h1>
                </>
            ) : (
                <></>
            )}
            {userData && <button onClick={handleClickPay}>Pay</button>}
            {/* handle unclickable if shipping hasn't been selected */}
        </Box>
    );
};

export { Checkout };
