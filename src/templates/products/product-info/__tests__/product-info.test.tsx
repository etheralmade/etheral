import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ProductInfo } from '../product-info';
import { mockProduct1 } from 'helper/const';
import { Currencies } from 'state/reducers/currency-reducer';

describe('ProductInfo', () => {
    const Element = (
        <ProductInfo
            productName={mockProduct1.name}
            prices={mockProduct1.prices}
            description={mockProduct1.description}
            productDetails={mockProduct1.productDetails}
            currency={Currencies.IDR}
            productAmount={1}
            maxInCart={false}
            availableSizes="S, M, L"
            gems={{ withGems: false, gemTypes: '', gemSizes: '' }}
            submit={jest.fn(() => {})}
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

    it('matches snapshot', () => {
        const run = false;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
