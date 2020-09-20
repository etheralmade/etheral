import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Pagination } from '../pagination';

describe('Pagination', () => {
    const mockCurrent = 2;
    const mockNumOfPages = 5;
    const mockClickPage = jest.fn(() => {});

    const Element = (
        <Pagination
            current={mockCurrent}
            numOfPages={mockNumOfPages}
            handleClickPage={mockClickPage}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('Should render all page links correctly', () => {
        const { queryByText } = render(Element);

        for (let i = 0; i < mockNumOfPages; i++) {
            const PageElement = queryByText((i + 1).toString());

            if (PageElement) {
                expect(PageElement).toBeInTheDocument();
            } else {
                fail();
            }
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
        const FirstPage = getByText((1).toString());

        userEvent.click(FirstPage);
        expect(mockClickPage).toBeCalledWith(0);
    });

    it('matches snapshot', () => {
        const run = true;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
