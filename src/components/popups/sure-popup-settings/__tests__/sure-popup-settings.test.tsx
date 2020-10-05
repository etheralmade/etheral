import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SurePopupSettings } from '../sure-popup-settings';

describe('SurePopupSettings', () => {
    const yes = jest.fn(() => {});
    const no = jest.fn(() => {});
    const close = jest.fn(() => {});

    const Element = <SurePopupSettings yes={yes} no={no} close={close} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('Should render and react correctly when user clicks the yes button', () => {
        const { getByText } = render(Element);
        const YesButton = getByText('Yes');
        userEvent.click(YesButton);
        expect(yes).toBeCalled();
    });

    it('Should render and react correctly when user clicks the yes button', () => {
        const { getByText } = render(Element);
        const NoButton = getByText('No');
        userEvent.click(NoButton);
        expect(no).toBeCalled();
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
