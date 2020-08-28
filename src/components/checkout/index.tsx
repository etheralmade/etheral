import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { connect } from 'react-redux';

import { State as ReduxState } from 'state/createStore';
import { Checkout as CheckoutEl } from './checkout';
import { IState as ICartState } from 'state/reducers/cart-reducer';

type Props = {};

const Checkout: React.FC<Props & ICartState> = ({ cart }) => {
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    useEffect(() => {
        setDb(firebase.firestore());
    }, []);

    return db ? <CheckoutEl db={db} cartObj={{ cart }} /> : <></>;
};

const mapStateToProps = (state: ReduxState) => ({
    cart: state.cartReducer.cart,
});

export default connect<ICartState, {}, Props, ReduxState>(mapStateToProps)(
    Checkout
);
