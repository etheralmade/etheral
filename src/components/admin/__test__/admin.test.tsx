import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { sha256 } from 'js-sha256';

import { Admin } from '../admin';

describe('Admin page', () => {
    const mockUserExist = {
        email: 'foo@example.com',
        pass: '123456',
    };

    const mockDb = ({
        collection: jest.fn(() => ({
            where: jest.fn((str: string, comp: string, email: string) => ({
                where: jest.fn((str: string, comp: string, pass: string) => ({
                    get: jest.fn(() => {
                        if (
                            email === mockUserExist.email &&
                            pass === sha256(mockUserExist.pass)
                        ) {
                            return {
                                size: 1,
                            };
                        } else {
                            return {
                                size: 0,
                            };
                        }
                    }),
                    str,
                    comp,
                })),
                str,
                comp,
            })),
        })),
    } as any) as firebase.firestore.Firestore;

    const el: React.ReactElement = <Admin db={mockDb} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should not give access to admin dashboard if the user authenticated is not on the admin-user database', () => {
        const { queryByTestId, getByLabelText, getByDisplayValue } = render(el);
        const adminEmailInput = getByLabelText('Email');
        const adminPassInput = getByLabelText('Password');
        const submitInput = getByDisplayValue('Login as admin');

        userEvent.type(adminEmailInput, 'nonexistent@email.com');
        userEvent.type(adminPassInput, 'wrongpassword');

        userEvent.click(submitInput);

        setTimeout(() => {
            const adminDashboard = queryByTestId('dashboard');
            if (adminDashboard) {
                fail();
            } else {
                expect(adminDashboard).toBeNull();
            }
        }, 500);
    });

    it('should give access to admin dashboard if the user authenticated is on the admin-user database', () => {
        const { queryByTestId, getByLabelText, getByDisplayValue } = render(el);
        const adminEmailInput = getByLabelText('Email');
        const adminPassInput = getByLabelText('Password');
        const submitInput = getByDisplayValue('Login as admin');

        userEvent.type(adminEmailInput, mockUserExist.email);
        userEvent.type(adminPassInput, mockUserExist.pass);

        userEvent.click(submitInput);

        setTimeout(() => {
            const adminDashboard = queryByTestId('dashboard');

            if (!adminDashboard) {
                fail();
            } else {
                expect(adminDashboard).toBeInTheDocument();
            }

            const logoutButton = getByDisplayValue('Log out');
            userEvent.click(logoutButton);

            expect(adminDashboard).not.toBeInTheDocument();
        }, 500);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
