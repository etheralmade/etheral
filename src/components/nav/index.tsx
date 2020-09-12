import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { connect } from 'react-redux';

import { Navigation as NavigationEl } from './nav';

import { State as ReduxState } from 'state/createStore';
import { IState as ICartState } from 'state/reducers/cart-reducer';

const Navigation: React.FC<ICartState> = ({ cart }) => {
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    // overcome firebase.auth is not a function...
    useEffect(() => {
        setAuth(firebase.auth());
        setDb(firebase.firestore());
    }, []);

    return auth && db ? (
        <NavigationEl auth={auth} db={db} cart={cart} />
    ) : (
        <></>
    );
};

const mapStateToProps = (state: ReduxState) => ({
    cart: state.cartReducer.cart,
});

export default connect<ICartState, {}, {}, ReduxState>(mapStateToProps)(
    Navigation
);
