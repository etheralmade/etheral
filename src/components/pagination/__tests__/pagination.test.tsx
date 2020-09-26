import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Pagination } from '../pagination';

describe('Pagination', () => {
    const mockCurrent = 4;
    const mockNumOfPages = 8;
    const mockClickPage = jest.fn(() => {});
    const mockGoToFirst = jest.fn(() => {});
    const mockGoToLast = jest.fn(() => {});

    const Element = (
        <Pagination
            current={mockCurrent}
            numOfPages={mockNumOfPages}
            handleClickPage={mockClickPage}
            goToFirst={mockGoToFirst}
            goToLast={mockGoToLast}
        />
    );

    const ElementWithMaxCurrent = (
        <Pagination
            current={mockNumOfPages - 1}
            numOfPages={mockNumOfPages}
            handleClickPage={mockClickPage}
            goToFirst={mockGoToFirst}
            goToLast={mockGoToLast}
        />
    );

    const ElementWithMinCurrent = (
        <Pagination
            current={0}
            numOfPages={mockNumOfPages}
            handleClickPage={mockClickPage}
            goToFirst={mockGoToFirst}
            goToLast={mockGoToLast}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('Should render all page links correctly', () => {
        const { queryByText } = render(Element);

        // hard coded.
        for (let i = 2; i < 7; i++) {
            const PageElement = queryByText((i + 1).toString());

            if (PageElement) {
                expect(PageElement).toBeInTheDocument();
            } else {
                fail();
            }
        }
    });

    it('should render 5 page links even though current page is maximum', () => {
        const { queryByText } = render(ElementWithMaxCurrent);

        for (let i = mockNumOfPages; i < mockNumOfPages - 5; i--) {
            const PageElement = queryByText((i + 1).toString());

            if (PageElement) {
                expect(PageElement).toBeInTheDocument();
            } else {
                fail();
            }
        }
    });

    it('Should render go-to-first button when first-page-index is not visible', () => {
        render(ElementWithMaxCurrent);

        const GoToFirst = document.getElementById('go-to-first');

        if (GoToFirst) {
            userEvent.click(GoToFirst);
            expect(mockGoToFirst).toBeCalled();
        } else {
            fail();
        }
    });

    it('Should not go-to-first button when last-page-index is not visible', () => {
        render(ElementWithMinCurrent);

        const GoToFirst = document.getElementById('go-to-first');

        if (GoToFirst) {
            fail();
        } else {
            expect(true).toBe(true);
        }
    });

    it('should not render go-to-last button when max index is visible', () => {
        render(ElementWithMaxCurrent);

        const GoToLast = document.getElementById('go-to-last');

        if (GoToLast) {
            fail();
        } else {
            expect(true).toBe(true);
        }
    });

    it('should render both last and first buttons when neither max nor first index is visible', () => {
        render(Element);

        const GoToFirst = document.getElementById('go-to-first');
        const GoToLast = document.getElementById('go-to-last');

        if (GoToLast && GoToFirst) {
            expect(GoToLast).toBeInTheDocument();
            expect(GoToFirst).toBeInTheDocument();
        } else {
            fail();
        }
    });

    // provide rebass container?

    // it('Should render element with virtual hierarchy on current page number', () => {
    //     const { getByText } = render(Element);
    //     const CurrentNum = getByText((mockCurrent + 1).toString());

    //     expect(CurrentNum).toHaveStyle(
    //         `background-color: ${theme.colors.black[0]};`
    //     );
    // });

    it('Should calls provided function when a page num is clicked', () => {
        const { getByText } = render(Element);
        const FirstPage = getByText((5).toString());

        userEvent.click(FirstPage);
        expect(mockClickPage).toBeCalledWith(4);
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
