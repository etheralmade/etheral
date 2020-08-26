import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { set } from 'lodash';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Login } from '../login';
import { LoginProps } from 'components/auth/auth';

describe('Login component', () => {
    const loginDataContainer = {
        email: '',
        password: '',
    };
    const login = jest.fn(({ email, password }: LoginProps) => {
        set(loginDataContainer, 'email', email);
        set(loginDataContainer, 'password', password);
    });

    const el: React.ReactElement = <Login login={login} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render and submits correctly', () => {
        const { getByLabelText, getByDisplayValue } = render(el);

        const emailInput: HTMLElement = getByLabelText('Email');
        const passwordInput: HTMLElement = getByLabelText('Password');

        const email = 'aa@aa';
        const password = '124';

        userEvent.type(emailInput, email);
        userEvent.type(passwordInput, password);

        const submitButton: HTMLElement = getByDisplayValue('Login');
        userEvent.click(submitButton);

        setTimeout(() => {
            expect(loginDataContainer.email).toBe(email);
            expect(loginDataContainer.password).toBe(password);
        }, 800);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
