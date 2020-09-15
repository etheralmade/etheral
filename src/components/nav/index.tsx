import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import { connect } from 'react-redux';

import { Navigation as NavigationEl } from './nav';

import { State as ReduxState } from 'state/createStore';
import { IState as ICartState } from 'state/reducers/cart-reducer';

const Navigation: React.FC<ICartState> = ({ cart }) => {
    // extract addBanner boolean value from graphql
    const data = useStaticQuery(graphql`
        query {
            homepage {
                addBanner
            }
        }
    `);

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
        <NavigationEl
            auth={auth}
            db={db}
            cart={cart}
            addBanner={data.homepage.addBanner as boolean}
        />
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
