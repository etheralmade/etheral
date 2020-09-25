import React from 'react';
import { Link } from '@reach/router';

import { Text, Flex } from 'rebass';
import { InlineIcon } from '@iconify/react';
import arrowRightSLine from '@iconify/icons-ri/arrow-right-s-line';

import { nameToSlug } from 'helper/const';

/**
 * @param location: Location of breadcrumb's parent component.
 */
type Props = {
    location: string;
    append?: boolean;
    appendText?: string;
};

const Breadcrumbs: React.FC<Props> = ({ location, append, appendText }) => {
    const locationSplitted = append
        ? [...location.split('/'), appendText || '']
        : location.split('/');

    return (
        <Flex sx={{ a: { textDecoration: 'none' } }}>
            {/* base home link. */}
            <Link to="/">
                <Text
                    variant="body"
                    fontWeight="regular"
                    ml={[1]}
                    sx={{
                        svg: {
                            ml: [1],
                            transform: 'translate(0, 4px)',
                        },
                    }}
                >
                    HOME
                    <InlineIcon icon={arrowRightSLine} />
                </Text>
            </Link>
            {/* rendered links from location props */}
            {locationSplitted.map((loc, i) => {
                if (append && i === locationSplitted.length - 1) {
                    return (
                        <Text variant="body" fontWeight="bold">
                            {loc}
                        </Text>
                    );
                } else {
                    const href = locationSplitted
                        .slice(0, i + 1)
                        .map(link => nameToSlug(link)) // reformat all location member to have its "slug attribute"
                        .join('/'); // reconfigure the link for EACH location string.

                    return (
                        <Link to={href} key={`breadcrumb-link-${href}`}>
                            <Text
                                variant="body"
                                fontWeight={
                                    i === locationSplitted.length - 1
                                        ? 'bold'
                                        : 'regular'
                                }
                                ml={[1]}
                                sx={{
                                    svg: {
                                        ml: [1],
                                        transform: 'translate(0, 4px)',
                                    },
                                }}
                            >
                                {loc.toUpperCase()}
                                {i !== locationSplitted.length - 1 && (
                                    <InlineIcon icon={arrowRightSLine} />
                                )}
                            </Text>
                        </Link>
                    );
                }
            })}
        </Flex>
    );
};

export { Breadcrumbs };
