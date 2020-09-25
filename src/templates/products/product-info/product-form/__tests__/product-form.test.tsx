import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ProductForm } from '../product-form';

describe('ProductForm', () => {
    const Element = (
        <ProductForm
            availableSizes="S, M, L"
            gems={{ withGems: false, gemTypes: '', gemSizes: '' }}
        />
    );

    const ElementWithGems = (
        <ProductForm
            availableSizes="S, M, L"
            gems={{ withGems: true, gemTypes: 'A, B', gemSizes: 'S, M' }}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should not render gems select compoenent if the attr withGems is set to false', () => {
        const { queryByLabelText } = render(Element);

        const GemTypeSelect = queryByLabelText('GEMS');

        if (GemTypeSelect) {
            fail();
        } else {
            expect(GemTypeSelect).not.toBeInTheDocument();
        }
    });

    it('should render gems select compoenent if the attr withGems is set to true', () => {
        const { queryByLabelText } = render(ElementWithGems);

        const GemTypeSelect = queryByLabelText('GEMS');
        const GemSizeSelect = queryByLabelText('GEMS DIAMETER');

        if (GemTypeSelect && GemSizeSelect) {
            expect(GemTypeSelect).toBeInTheDocument();
            expect(GemSizeSelect).toBeInTheDocument();
        } else {
            fail();
        }
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
