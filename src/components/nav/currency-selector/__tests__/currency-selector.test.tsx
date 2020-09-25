import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
// mock store
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Currencies } from 'state/reducers/currency-reducer';
import CurrencySelector from '..';

describe('CurrencySelector', () => {
    const mockStore = configureStore([]);

    let store;
    let Element: any;
    beforeEach(() => {
        store = mockStore({
            currencyReducer: {
                currency: Currencies.IDR,
            },
        });

        store.dispatch = jest.fn();

        Element = (
            <Provider store={store}>
                <CurrencySelector
                    currLocation="/"
                    showDropdown={true}
                    desktop={true}
                />
            </Provider>
        );
    });

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
