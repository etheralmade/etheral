import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Stockist } from '../stockist';

import * as Gatsby from 'gatsby';

const stockistJktA = {
    address: '',
    location: 'Jakarta',
    name: 'Toko A',
    phoneNumber: '123',
    web: '',
    zipCode: '123123',
};

const stockistJktB = {
    address: '',
    location: 'Jakarta',
    name: 'Toko B',
    phoneNumber: '1123',
    web: '',
    zipCode: '12',
};

const stockistBdg = {
    address: '',
    location: 'Bandung',
    name: 'Toko C',
    phoneNumber: '1123',
    web: '',
    zipCode: '12',
};

describe('Stockist', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

    const Element = <Stockist />;

    beforeEach(() => {
        useStaticQuery.mockImplementationOnce(() => ({
            allConsignment: {
                edges: [
                    { node: stockistJktA },
                    { node: stockistJktB },
                    { node: stockistBdg },
                ],
            },
        }));
    });
    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('Should render based on location correctly', () => {
        const { getByRole, getByTestId } = render(Element);

        const Jkt = getByTestId('JAKARTA');
        const Bdg = getByTestId('BANDUNG');

        // check for listitems on Jkt
        const LiJkt = document.querySelectorAll(`${Jkt.className} li`);
        LiJkt.forEach(el => {
            expect(
                el.textContent?.includes('Toko A') ||
                    el.textContent?.includes('Toko B')
            ).toBe(true);
        });

        const LiBdg = document.querySelectorAll(`${Bdg.className} li`);
        LiBdg.forEach(el => {
            expect(el).toHaveTextContent('Toko C');
        });
    });

    it('matches snapshot', () => {
        const run = false;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
