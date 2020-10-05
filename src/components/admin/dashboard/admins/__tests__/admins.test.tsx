import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Admins } from '../admins';

describe('Admins', () => {
    const mockDb = {
        collection: () => ({
            add: () => ({}),
            where: () => ({
                get: () => ({
                    docs: [],
                }),
            }),
            get: () => ({
                docs: [],
            }),
        }),
    };

    const Element = (
        <Admins
            db={(mockDb as unknown) as firebase.firestore.Firestore}
            adminEmail=""
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
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
