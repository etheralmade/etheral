import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StockistItem } from '../stockist-item';

describe('StockistItem', () => {
    const stockistBdg = {
        address: '',
        location: 'Bandung',
        name: 'Toko C',
        phoneNumber: '1123',
        web: '',
        zipCode: '12',
    };

    const Element = <StockistItem {...stockistBdg} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    /* it('renders correctly', () => {
		const { getByTestId } = render()
	}) */

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
