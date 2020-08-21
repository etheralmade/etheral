import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { decrement, increment, reset } from 'state/actions/number';

import { useFirestore } from 'reactfire';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';
const App = (props: any) => {
    const db: firebase.firestore.Firestore = useFirestore();

    // eslint-disable-next-line @typescript-eslint/tslint/config
    const { number } = props;
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment());
    };
    const handleDecrement = () => {
        dispatch(decrement());
    };
    const handleReset = () => {
        dispatch(reset());
    };

    const handleIncrementMultiple = () => {
        dispatch(increment(3));
    };

    const handleDecrementMultiple = () => {
        dispatch(decrement(4));
    };

    const fetchDatas = async () => {};

    return (
        <Layout>
            <SEO />
            <div
                style={{
                    display: 'flex',
                }}
            >
                <button onClick={handleIncrement}>Add one</button>
                <button onClick={handleIncrementMultiple}>Add 3</button>
                <button onClick={handleDecrement}>Subtract one</button>
                <button onClick={handleDecrementMultiple}>Subtract 4</button>
                <button onClick={handleReset}>Reset</button>
                <h2>Number is {number}</h2>
            </div>
            <div>
                <button onClick={fetchDatas}>Fetch all contents</button>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state: any) => ({
    number: state.numReducer.num,
});

export default connect(mapStateToProps)(App);
