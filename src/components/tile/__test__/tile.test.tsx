import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tile } from '../tile';

describe('Tile component', () => {
    const mockTextContent = 'Hello, World!';

    const elementWithUrl = <Tile url="" imgAlt="mockAltImage" />;
    const elementExtended = <Tile url="" imgAlt="mockAltImage" width="50%" />;
    const elementWithText = (
        <Tile url="" imgAlt="mockAltImage" tileOnText={mockTextContent} />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(elementWithUrl, div);
    });

    it('should render extended element without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(elementExtended, div);
    });

    it('should render extended element with style rules correctly', () => {
        const { getByTestId } = render(elementExtended);
        const TileContainer = getByTestId('tile-container');

        expect(TileContainer).toHaveStyle('width: 50%;');
    });

    it('should render element with text correctly', () => {
        const { getByRole } = render(elementWithText);

        const Text = getByRole('heading');
        expect(Text).toBeInTheDocument();
        expect(Text).toHaveTextContent(mockTextContent);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(elementWithUrl).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
