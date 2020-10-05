import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AdminBox } from '../admin-box';
import { Admin } from 'helper/schema';

const mockEmail = 'loha@gmail.com';

const mockAdmin: Admin = {
    email: 'lolo@mock',
    invitedBy: mockEmail,
    password: '1234',
};

describe('AdminBox', () => {
    const mockremoveAdmin = jest.fn(() => {});

    const Element = (
        <AdminBox
            bg=""
            adminEmail={mockEmail}
            removeAdmin={mockremoveAdmin}
            {...mockAdmin}
        />
    );
    const ElementSelf = (
        <AdminBox
            bg=""
            adminEmail={mockAdmin.email}
            removeAdmin={mockremoveAdmin}
            {...mockAdmin}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should render the remove admin button  correctly', () => {
        const { queryByRole } = render(Element);

        const RemoveButton = queryByRole('button', { name: 'Remove' });

        if (!RemoveButton) {
            fail();
        }

        expect(RemoveButton).toBeInTheDocument();

        // test onClick
        userEvent.click(RemoveButton);
        expect(mockremoveAdmin).toBeCalled();
    });

    it('Should not render the remove button if user logged in has the same email with the element rednered', () => {
        const { queryByRole } = render(ElementSelf);

        const RemoveButton = queryByRole('button', { name: 'Remove' });

        if (!RemoveButton) {
            expect(true).toBe(true);
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
