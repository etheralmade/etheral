import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// mock store
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { ProductBox } from '../product-box';
import { mockProduct1 } from 'helper/const';
import { Currencies } from 'state/reducers/currency-reducer';

describe('ProductBox', () => {
    const mockItem = {
        product: mockProduct1,
        amount: 1,
        details: {
            size: 'S',
            gemSize: '3',
        },
    };

    const mockStore = configureStore([]);

    let store;
    let Element: any;
    let ElementWithDispatch: any;

    beforeEach(() => {
        store = mockStore({
            currencyReducer: {
                currency: Currencies.IDR,
            },
        });

        store.dispatch = jest.fn();

        Element = (
            <Provider store={store}>
                <ProductBox
                    item={mockItem}
                    currency={Currencies.IDR}
                    connectDispatch={false}
                />
            </Provider>
        );

        ElementWithDispatch = (
            <Provider store={store}>
                <ProductBox
                    item={mockItem}
                    currency={Currencies.IDR}
                    connectDispatch={true}
                />
            </Provider>
        );
    });

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    // it('User should NOT be able to add and/or remove element (product from cart) if the element is NOT CONNECTED to dispatch.', () => {
    //     const { queryByTestId } = render(Element);

    //     const AddButton = queryByTestId('add-button');
    //     const RemoveButton = queryByTestId('remove-button');

    //     if (!AddButton && !RemoveButton) {
    //         expect(true).toBe(true);
    //     } else {
    //         fail();
    //     }
    // });

    // it('User should be ABLE to add and/or remove element (product from cart) if the element is CONNECTED to dispatch.', () => {
    //     const { queryByTestId } = render(ElementWithDispatch);

    //     const AddButton = queryByTestId('add-button');
    //     const RemoveButton = queryByTestId('remove-button');

    //     if (AddButton && RemoveButton) {
    //         expect(AddButton).toBeInTheDocument();
    //         expect(RemoveButton).toBeInTheDocument();
    //     } else {
    //         fail();
    //     }
    // });

    // it('matches snapshot', () => {
    //     const run = true;

    //     if (run) {
    //         const tree = renderer.create(Element).toJSON();
    //         expect(tree).toMatchSnapshot();
    //     }
    // });
});
