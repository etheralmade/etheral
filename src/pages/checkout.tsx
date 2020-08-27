import React from 'react';
import { PageProps } from 'gatsby';
import { connect } from 'react-redux';

import { Layout } from 'components/layout';
import { State } from 'state/createStore';
import { IState as ICartState } from 'state/reducers/cart-reducer';

const CheckoutPage = (props: PageProps) => {
    // const { cart } = data as { cart: ICartState };
    const { cart } = (props as any) as ICartState;

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

    // pay here
    const handleClickPay = () => {
        // TODO: check for auth.
        // interact with 3rd party api for payment.
        return;
    };

    return (
        <Layout>
            <h2>Price: IDr {formatPrice(price)}</h2>
            <button onClick={handleClickPay}>Pay</button>
        </Layout>
    );
};

const mapStateToProps = (state: State) => ({
    cart: state.cartReducer.cart,
});

export default connect(mapStateToProps)(CheckoutPage);
