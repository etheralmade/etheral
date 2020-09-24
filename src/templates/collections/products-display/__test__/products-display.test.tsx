import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ProductsDisplay } from '../products-display';
import { mockProduct1 } from 'helper/const';

describe('Products display on collection page', () => {
    afterEach(cleanup);

    const el: React.ReactElement = (
        <ProductsDisplay products={[mockProduct1]} />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render the appropriate products correctly', () => {
        const { getByTestId } = render(el);

        const productName: HTMLElement = getByTestId('product-name');
        expect(productName).toHaveTextContent(mockProduct1.name);
    });

    // no snapshot testing yet, components not yet ready
    // it('matches snapshot', () => {
    //     const tree = renderer.create(el).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
