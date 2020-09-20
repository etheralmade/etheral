import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Breadcrumbs } from '../breadcrumbs';

describe('Breadcrumbs', () => {
    const mockAppendText = 'SHOP ALL';

    const Element = <Breadcrumbs location="shop/collection1/fall" />;
    const ElmentWithAppend = (
        <Breadcrumbs
            location="shop"
            append={true}
            appendText={mockAppendText}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    // // hard-coded the test for simplicity sake
    // it('should render links from the location correctly', () => {
    //     const { getByText } = render(Element);

    //     const Collection1El = getByText('COLLECTION1');

    //     expect(Collection1El.getAttribute('href')).toBe('shop/collection1');
    // });

    it('Should render the appended text', () => {
        const { queryByText } = render(ElmentWithAppend);

        const AppendedText = queryByText(mockAppendText);

        if (AppendedText) {
            expect(AppendedText).toBeInTheDocument();
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
