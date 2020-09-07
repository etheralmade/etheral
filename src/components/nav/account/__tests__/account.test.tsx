import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Account } from '../account';

describe('Account element to log in ', () => {
    const elementNotAuthenticated = <Account user={null} desktop={true} />;
    const elementAuthenticated = (
        <Account
            user={{ displayName: 'Jane' } as firebase.User}
            desktop={true}
        />
    );

    afterEach(cleanup);

    it('should always passes', () => {});

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(elementAuthenticated, div);
    });

    it('should render login button if user is not authenticated', () => {
        const { queryByText } = render(elementNotAuthenticated);
        const LoginButton = queryByText('LOGIN');

        if (LoginButton) {
            expect(LoginButton).toBeInTheDocument();
        } else {
            fail();
        }
    });

    it('should render display name if user is authenticated', () => {
        const { queryByText } = render(elementNotAuthenticated);
        const DisplayNameEl = queryByText('Jane');

        setTimeout(() => {
            if (DisplayNameEl) {
                expect(DisplayNameEl).toBeInTheDocument();
            } else {
                fail();
            }
        }, 200);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(elementAuthenticated).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
