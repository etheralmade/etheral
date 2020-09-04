import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { mockProduct1 } from 'helper/const';
import { ProductCard } from '../product-card';

describe('product card component', () => {
    const element = <ProductCard product={mockProduct1} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(element, div);
    });

    it('it should display an image and display products name and price correctly', () => {
        const { queryByRole, queryByDisplayValue } = render(element);

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
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
