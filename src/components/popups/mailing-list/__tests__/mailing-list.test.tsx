import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MailingList } from '../mailing-list';

import * as Gatsby from 'gatsby';
const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');

describe('MailingList', () => {
    const mockCloseModal = jest.fn(() => {});

    const Element = <MailingList closeModal={mockCloseModal} />;

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    afterEach(cleanup);
    beforeEach(() => {
        useStaticQuery.mockImplementationOnce(() => ({
            imgXS: {
                childImageSharp: {
                    fixed: {},
                },
            },
            imgS: {
                childImageSharp: {
                    fixed: {},
                },
            },
            imgL: {
                childImageSharp: {
                    fixed: {},
                },
            },
        }));
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should close modal when user clicked the close button correctly', () => {
        const { queryByLabelText } = render(Element);

        const CloseButton = queryByLabelText('close-modal-button');

        if (CloseButton) {
            expect(CloseButton).toBeInTheDocument();
            userEvent.click(CloseButton);

            expect(mockCloseModal).toHaveBeenCalled();
        } else {
            fail();
        }
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
