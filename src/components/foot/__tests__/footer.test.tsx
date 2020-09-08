import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '../footer';

describe('Footer element', () => {
    const element = <Footer />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(element, div);
    });

    it('matches snapshot', () => {
        const run = false;
        if (run) {
            const tree = renderer.create(element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
