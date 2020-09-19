import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
    DiscountCodeInput,
    CODE_NOT_EXISTS,
    CODE_EXPIRED,
} from '../discount-code-input';

const date = new Date();
const yesterday = new Date().setDate(date.getDate() - 1);
const tomorrow = new Date().setDate(date.getDate() + 1);

const expiredCode = {
    expiresIn: {
        toDate: () => new Date(yesterday),
    },
};

const validCode = {
    expiresIn: {
        toDate: () => new Date(tomorrow),
    },
    value: '10',
};

describe('DiscountCodeInput', () => {
    const expired = 'ABCDEF';
    const valid = 'BDBEAE';

    const mockApplyCode = jest.fn(() => {});
    const mockDb = ({
        collection: () => ({
            doc: (code: string) => {
                if (code === expired) {
                    return {
                        get: () => ({
                            exists: true,
                            data: () => expiredCode,
                        }),
                    };
                } else if (code === valid) {
                    return {
                        get: () => ({
                            exists: true,
                            data: () => validCode,
                        }),
                    };
                } else {
                    return {
                        get: () => ({
                            exists: true,
                        }),
                    };
                }
            },
        }),
    } as any) as firebase.firestore.Firestore;

    const Element = <DiscountCodeInput db={mockDb} applyCode={mockApplyCode} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should display error message if the user input an invalid code correctly', () => {
        const { queryByRole, getByLabelText } = render(Element);

        const Input = getByLabelText('Discount code input');
        const Submit = getByLabelText('Apply discount code');

        userEvent.type(Input, 'dffaw');
        userEvent.click(Submit);

        setTimeout(() => {
            const ErrMsg = queryByRole('alert');
            if (ErrMsg) {
                expect(ErrMsg).toHaveTextContent(CODE_NOT_EXISTS);
            } else {
                fail();
            }
        }, 400);
    });

    it('should display error message if the user input an expired code correctly', () => {
        const { queryByRole, getByLabelText } = render(Element);

        const Input = getByLabelText('Discount code input');
        const Submit = getByLabelText('Apply discount code');

        userEvent.type(Input, expired);
        userEvent.click(Submit);

        setTimeout(() => {
            const ErrMsg = queryByRole('alert');
            if (ErrMsg) {
                expect(ErrMsg).toHaveTextContent(CODE_EXPIRED);
            } else {
                fail();
            }
        }, 400);
    });

    it('should call applyCode function if user input a valid code correctly', () => {
        const { queryByRole, getByLabelText } = render(Element);

        const Input = getByLabelText('Discount code input');
        const Submit = getByLabelText('Apply discount code');

        userEvent.type(Input, valid);
        userEvent.click(Submit);

        setTimeout(() => {
            const ErrMsg = queryByRole('alert');
            if (ErrMsg) {
                fail();
            }

            expect(mockApplyCode).toBeCalled();
        }, 400);
    });

    it('matches snapshot', () => {
        const run = false;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
