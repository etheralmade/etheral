import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { mockOrder } from 'helper/const';
import { OrderBox } from '../order-box';

describe('OrderBox', () => {
    const { oid, date, delivered: shipped, currency, paid } = mockOrder;

    const mockFocusOrder = jest.fn(() => {});
    const mockBg = '#fafafa';

    const Element = (
        <OrderBox
            oid={oid}
            date={date}
            shipped={shipped}
            currency={currency}
            focusOrder={mockFocusOrder}
            bg={mockBg}
            paid={paid}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should react to click event correctly', () => {
        const { getByTestId } = render(Element);
        const OrderBox = getByTestId('order-box');

        userEvent.click(OrderBox);
        expect(mockFocusOrder).toBeCalled();
    });

    it('should render with background color correctly', () => {
        const { getByTestId } = render(Element);
        const OrderBox = getByTestId('order-box');

        expect(OrderBox).toHaveStyle(`background-color: ${mockBg}`);
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
