import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { Navigation } from '../navigation';
import { StateViews } from '../../dashboard';

describe('Admin navigation component', () => {
    let viewContainer: StateViews = StateViews.NONE;

    const mockLogout = jest.fn(() => {});
    const mockChangeView = jest.fn((viewName: StateViews) => {
        viewContainer = viewName;
    });

    const el: React.ReactElement = (
        <Navigation
            inView={viewContainer}
            logout={mockLogout}
            changeView={mockChangeView}
        />
    );

    afterEach(cleanup);
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should invoke logout function when logout button is clicked', () => {
        const { getByText } = render(el);

        const LogoutButton: HTMLElement = getByText('Log out');

        userEvent.click(LogoutButton);
        expect(mockLogout).toBeCalled();
    });

    it('should call changeView function accordingly ', () => {
        const { getByText } = render(el);

        const OrderButton: HTMLElement = getByText('Orders');

        userEvent.click(OrderButton);
        expect(mockChangeView).toBeCalled();
        expect(viewContainer).toBe(StateViews.ORDERS);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
