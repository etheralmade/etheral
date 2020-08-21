import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { decrement, increment, reset } from 'state/actions/number';

import { Layout } from '../components/layout';
import { SEO } from '../components/seo';

const App = (props: any) => {
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

    return (
        <Layout>
            <SEO />
            <div
                style={{
                    display: 'flex',
                }}
            >
                <button onClick={handleIncrement}>Add one</button>
                <button>Add </button>
                <button onClick={handleDecrement}>Subtract one</button>
                <button>Subtract </button>
                <button onClick={handleReset}>Reset</button>
                <h2>Number is {number}</h2>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state: any) => ({
    number: state.numReducer.num,
});

export default connect(mapStateToProps)(App);
