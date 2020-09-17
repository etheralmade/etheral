import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BlogPreview } from '../blog-preview';
import { mockBlog } from 'helper/const';

describe('BlogPreview', () => {
    const Element = <BlogPreview blog={mockBlog} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should render preview with summary and title correctly', () => {
        const { queryByTestId } = render(Element);

        const TitleElement = queryByTestId('title');
        const SummaryElement = queryByTestId('summary');

        if (TitleElement && SummaryElement) {
            expect(TitleElement).toHaveTextContent(mockBlog.title);
            expect(SummaryElement).toHaveTextContent(mockBlog.summary);
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
