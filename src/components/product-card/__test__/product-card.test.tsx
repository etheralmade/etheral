import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { mockProduct1 } from 'helper/const';
import ProductCard from '..';
import { Currencies } from 'state/reducers/currency-reducer';

describe('product card component', () => {
    const mockStore = configureStore([]);
    let Element: any;

    beforeEach(() => {
        const store = mockStore({
            currencyReducer: {
                currency: Currencies.IDR,
            },
        });

        store.dispatch = jest.fn();

        Element = (
            <Provider store={store}>
                <ProductCard product={mockProduct1} />;
            </Provider>
        );
    });

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('it should display an image and display products name and price correctly', () => {
        const { queryByRole, queryByDisplayValue } = render(Element);

        setTimeout(() => {
            const ProductImage = queryByRole('image');
            const ProductName = queryByDisplayValue(mockProduct1.name);
            const ProductPrice = queryByDisplayValue(
                `IDR ${mockProduct1.idrPrice}`
            );

            if (ProductImage) {
                expect(ProductImage).toBeInTheDocument();
            } else {
                fail();
            }

            if (ProductName) {
                expect(ProductName).toBeInTheDocument();
            } else {
                fail();
            }

            if (ProductPrice) {
                expect(ProductPrice).toBeInTheDocument();
            } else {
                fail();
            }
        }, 300);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(Element).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
