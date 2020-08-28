import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ProductsDisplay } from '../products-display';
import { Product } from 'helper/schema/product';

describe('Products display on collection page', () => {
    const mockDisplayData: Product = {
        pid: '12132',
        amount: 1,
        slug: '/mock/slug',
        category: 'Blllla',
        collection: 'collection1',
        name: 'mock-return-data',
        idrPrice: 123,
        productImages: [
            {
                childImageSharp: {
                    fixed: undefined,
                },
            },
        ],
        urls: [],
        weight: 0,
    };

    afterEach(cleanup);

    const el: React.ReactElement = (
        <ProductsDisplay products={[mockDisplayData]} />
    );

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render the appropriate products correctly', () => {
        const { getByTestId } = render(el);

        const productName: HTMLElement = getByTestId('product-name');
        expect(productName).toHaveTextContent(mockDisplayData.name);
    });

    // no snapshot testing yet, components not yet ready
    // it('matches snapshot', () => {
    //     const tree = renderer.create(el).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
