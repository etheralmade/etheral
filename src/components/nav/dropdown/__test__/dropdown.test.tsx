import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FluidObject } from 'gatsby-image';

import { Dropdown } from '../dropdown';

import * as Gatsby from 'gatsby';

describe('Dropdown element', () => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

    beforeEach(() => {
        useStaticQuery.mockImplementationOnce(() => {
            return {
                collections: {
                    edges: [
                        {
                            node: {
                                name: 'Collection1',
                            },
                        },
                    ],
                },
                navImg: {
                    navigationImage: ['url1', 'url2'],
                    imgs: [
                        {
                            childImageSharp: {
                                fluid: {} as FluidObject,
                            },
                            url: 'url1',
                        },
                        {
                            childImageSharp: {
                                fluid: {} as FluidObject,
                            },
                            url: 'url2',
                        },
                    ],
                },
            };
        });
    });

    const element = (
        <Dropdown currLocation="/about" goBack={jest.fn(() => {})} />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(element, div);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
