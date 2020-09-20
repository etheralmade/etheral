import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Banner } from '../banner';

describe('Banner', () => {
    const mockBannerAttrs = {
        bannerBgColor: '#fff',
        bannerLink: '/payment',
        bannerText: 'Hello world',
        bannerTextColor: '#000',
    };

    const Element = <Banner {...mockBannerAttrs} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    it('should render the banner with attributes correctly', () => {
        const { queryByRole } = render(Element);
        const BannerElement = queryByRole('banner');

        if (BannerElement) {
            expect(BannerElement).toHaveTextContent(mockBannerAttrs.bannerText);
            expect(BannerElement).toHaveStyle(`
				background-color: ${mockBannerAttrs.bannerBgColor};
				color: ${mockBannerAttrs.bannerTextColor}
			`);
            // expect((BannerElement as HTMLLinkElement).href).toBe(
            //     mockBannerAttrs.bannerLink
            // );
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
