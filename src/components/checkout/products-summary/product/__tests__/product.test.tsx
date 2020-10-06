import React from 'react';
import ReactDOM from 'react-dom';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Product } from '../product';
import { mockProduct1 } from 'helper/const';
import { Currencies } from 'state/reducers/currency-reducer';

describe('Product', () => {
    const mockItem = {
        product: mockProduct1,
        amount: 1,
        details: {
            size: 'S',
        },
    };

    const mockCurrency = Currencies.IDR;
    const mockGridTemplate: string[] = [];

    const Element = (
        <Product
            item={mockItem}
            currency={mockCurrency}
            gridTemplate={mockGridTemplate}
            first={true}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    /* it('renders correctly', () => {
		const { getByTestId } = render()
	}) */

    // it('matches snapshot', () => {
    // 	const run = false

    //     if (run) {
    //         const tree = renderer.create(Element).toJSON()
    //         expect(tree).toMatchSnapshot()
    //     }
    // })
});
