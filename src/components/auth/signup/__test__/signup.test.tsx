import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { set } from 'lodash';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SignUp } from '../signup';
import { SignUpProps } from 'components/auth/auth';

describe('Signup component', () => {
    const signupDataContainer = {
        email: '',
        password: '',
        name: '',
    };
    const signup = jest.fn(({ email, password, name }: SignUpProps) => {
        set(signupDataContainer, 'email', email);
        set(signupDataContainer, 'password', password);
        set(signupDataContainer, 'name', name);
    });

    const el: React.ReactElement = <SignUp signup={signup} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should render and submits correctly', () => {
        const { getByLabelText, getByDisplayValue } = render(el);

        const emailInput: HTMLElement = getByLabelText('Email');
        const passwordInput: HTMLElement = getByLabelText('Password');
        const nameInput: HTMLElement = getByLabelText('Name');

        const email = 'aa@aa';
        const password = '124';
        const name = 'Alice';

        userEvent.type(emailInput, email);
        userEvent.type(passwordInput, password);
        userEvent.type(nameInput, name);

        const submitButton: HTMLElement = getByDisplayValue('Sign up');
        userEvent.click(submitButton);

        setTimeout(() => {
            expect(signupDataContainer.email).toBe(email);
            expect(signupDataContainer.password).toBe(password);
            expect(signupDataContainer.name).toBe(name);
        }, 800);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
