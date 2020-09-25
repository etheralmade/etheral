import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StatusBadge, BadgeTypes } from '../status-badge';

describe('StatusBadge', () => {
    const Element = <StatusBadge type={BadgeTypes.PAYMENT} paid={false} />;

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
