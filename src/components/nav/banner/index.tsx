import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Banner as BannerEl, Props } from './banner';

const Banner: React.FC<{}> = () => {
    const data = useStaticQuery(graphql`
        query {
            homepage {
                banner {
                    bannerBgColor
                    bannerLink
                    bannerText
                    bannerTextColor
                }
            }
        }
    `);

    const bannerData = data.homepage.banner as Props;

    return <BannerEl {...bannerData} />;
};

export default Banner;
