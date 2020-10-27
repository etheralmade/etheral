import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';

import { OrderItem } from '../order-item';
// import { mockOrder, mockOrderShipped, mockProducts } from 'helper/const';
import { mockOrder, mockProducts } from 'helper/const';

// import * as hook from 'helper/use-all-product-images';

// const useAllProductImages = jest.spyOn(hook, 'default');

describe('OrderItem Component', () => {
    const mockUpdateShipping = jest.fn(() => {});
    const mockHideOrder = jest.fn(() => {});

    const el: React.ReactElement = (
        <OrderItem
            order={mockOrder}
            allProducts={mockProducts}
            updateShipping={mockUpdateShipping}
            hideOrder={mockHideOrder}
        />
    );

    // can't test behavior now, as I don't know how to mock custom hook properly

    // const elShipped: React.ReactElement = (
    //     <OrderItem
    //         order={mockOrderShipped}
    //         allProducts={mockProducts}
    //         updateShipping={mockUpdateShipping}
    //     />
    // );

    afterEach(cleanup);
    // beforeEach(() => {
    //     const emptyData = {
    //         img: [
    //             {
    //                 childImageSharp: {
    //                     fixed: [],
    //                     fluid: [],
    //                 },
    //                 url: '',
    //             },
    //         ],
    //         pid: '',
    //     };

    //     const sizesWithEmptyData = {
    //         xs: [emptyData],
    //         s: [emptyData],
    //         m: [emptyData],
    //         l: [emptyData],
    //         xl: [emptyData],
    //     };

    //     useAllProductImages.mockImplementationOnce(() => ({
    //         extractImgs: () => ({
    //             xs: emptyData,
    //             s: emptyData,
    //             m: emptyData,
    //             l: emptyData,
    //             xl: emptyData,
    //         }),
    //         ...sizesWithEmptyData,
    //     }));
    // });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    // behaviorial tests => provide set timeout to give element some time to render.

    // it('should display a form asking for shipping info whenever admin checked the delivered checkbox', () => {
    //     const { queryByText, queryByTestId, getByRole } = render(el);
    //     const checkShippingInfoForm = () => {
    //         const ShippingDataForm = queryByTestId('shipping-info-form');
    //         if (ShippingDataForm) {
    //             expect(ShippingDataForm).toBeInTheDocument();
    //         } else {
    //             fail();
    //         }
    //     };

    //     const checkForShippingConfirmation = () => {
    //         const NotShippedKeyword = queryByText(
    //             'Status: Not shipped'
    //         ) as HTMLInputElement;

    //         if (NotShippedKeyword) {
    //             expect(NotShippedKeyword).toBeInTheDocument();
    //         } else {
    //             fail();
    //         }

    //         const ConfirmShipButton = getByRole('button');

    //         userEvent.click(ConfirmShipButton);

    //         setTimeout(checkShippingInfoForm, 300);
    //     };

    //     setTimeout(checkForShippingConfirmation, 300);
    // });

    // it('should not display the shipping infos if the order has already shipped', () => {
    //     const { queryByTestId } = render(elShipped);
    //     setTimeout(() => {
    //         const ShippingInfoCard = queryByTestId('shipping-info');

    //         if (!ShippingInfoCard) {
    //             fail();
    //         } else {
    //             expect(ShippingInfoCard).toBeInTheDocument();
    //         }
    //     }, 300);
    // });

    // it('matches snapshot', () => {
    //     const run = false;
    //     if (run) {
    //         const tree = renderer.create(el).toJSON();
    //         expect(tree).toMatchSnapshot();
    //     }
    // });
});
