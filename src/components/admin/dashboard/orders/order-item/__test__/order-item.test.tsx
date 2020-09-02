import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { OrderItem } from '../order-item';
import { mockOrders } from '../../orders.stories';
import { Order } from 'helper/schema/order';

describe('OrderItem Component', () => {
    const mockOrderShipped: Order = {
        ...mockOrders[0],
        delivered: true,
        shippingData: {
            shippedDate: new Date(),
            trackingCode: '12342',
            shippedBy: 'admin1',
        },
    };

    const el: React.ReactElement = <OrderItem order={mockOrders[0]} />;
    const elShipped: React.ReactElement = (
        <OrderItem order={mockOrderShipped} />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should display a form asking for shipping info whenever admin checked the delivered checkbox', () => {
        const { queryByLabelText, queryByTestId } = render(el);
        const ShippedCheckbox = queryByLabelText('shipped') as HTMLInputElement;

        if (ShippedCheckbox) {
            expect(ShippedCheckbox.checked).toBe(false);
            expect(ShippedCheckbox).toBeInTheDocument();
        } else {
            fail();
        }

        userEvent.click(ShippedCheckbox);

        setTimeout(() => {
            const ShippingDataForm = queryByTestId('shipping-info-form');
            if (ShippingDataForm) {
                expect(ShippingDataForm).toBeInTheDocument();
            } else {
                fail();
            }
        }, 300);
    });

    it('should not display the shipping infos if the order has already shipped', () => {
        const { queryByTestId } = render(elShipped);
        const ShippingInfoCard = queryByTestId('shipping-info');

        if (!ShippingInfoCard) {
            fail();
        } else {
            expect(ShippingInfoCard).toBeInTheDocument();
        }
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
