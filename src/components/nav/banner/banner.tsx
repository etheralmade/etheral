import React from 'react';
import { Link } from '@reach/router';

import { Text } from 'rebass';

export type Props = {
    bannerBgColor: string;
    bannerLink: string;
    bannerText: string;
    bannerTextColor: string;
};

const Banner: React.FC<Props> = ({
    bannerBgColor,
    bannerLink,
    bannerText,
    bannerTextColor,
}) => {
    return (
        <Link to={bannerLink}>
            <Text
                bg={bannerBgColor}
                color={bannerTextColor}
                px={[3]}
                py={[1, 1, 2]}
                textAlign="center"
                fontFamily="body"
                fontWeight="medium"
                role="banner"
                id="banner"
                fontSize={[0, 0, 1]}
            >
                {bannerText}
            </Text>
        </Link>
    );
};

export { Banner };
