import React from 'react';

import { Box as ReBox, Text, Flex } from 'rebass';

import { Type } from '..';
import StatusBadge, { BadgeTypes } from '../../../orders/status-badge';
import { getDateReadable } from 'helper/get-date';
import { Status } from '../..';

type Props = {
    item: any;
    type: Type;
    bg: string;
    handleClick: (name: string) => void;
};

const Box: React.FC<Props> = ({ item, type, bg, handleClick }) => {
    const textStyling = {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        color: 'black.0',
        fontWeight: 'bold',
        css: `
			 white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		`,
    };

    if (type === Type.PRODUCT || type === Type.COLLECTION) {
        return (
            <ReBox
                bg={bg}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(64px, 1fr))',
                    gridGap: 2,
                    transition: '0.2s',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                px={[2]}
                py={[2]}
                onClick={() => handleClick(item.name)}
            >
                <Text sx={{ gridColumn: '1/2' }} {...textStyling}>
                    {item.name}
                </Text>
                <Flex flexWrap="wrap" sx={{ gridColumn: '2/3' }}>
                    <StatusBadge
                        type={BadgeTypes.SETTINGS}
                        update={item.status === Status.UPDATE}
                    />
                </Flex>
                <Text sx={{ gridColumn: '3/4' }} {...textStyling}>
                    {getDateReadable(item.createdDate)}
                </Text>
                <Text sx={{ gridColumn: '4/5' }} {...textStyling}>
                    {item.lastModifiedDate
                        ? getDateReadable(item.lastModifiedDate)
                        : '-'}
                </Text>
            </ReBox>
        );
    } else if (type === Type.BLOG) {
        return (
            <ReBox
                bg={bg}
                sx={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(3, minmax(calc(256px / 3), 1fr))',
                    gridGap: 2,
                    transition: '0.2s',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                px={[2]}
                py={[2]}
                onClick={() => handleClick(item.slug)}
            >
                <Text sx={{ gridColumn: '1/2' }} {...textStyling}>
                    {item.slug}
                </Text>
                <Flex flexWrap="wrap" sx={{ gridColumn: '2/3' }}>
                    <StatusBadge
                        type={BadgeTypes.SETTINGS}
                        update={item.status === Status.UPDATE}
                    />
                </Flex>
                <Text sx={{ gridColumn: '3/4' }} {...textStyling}>
                    {getDateReadable(item.createdDate)}
                </Text>
                <Text sx={{ gridColumn: '4/5' }} {...textStyling}>
                    {item.lastModifiedDate
                        ? getDateReadable(item.lastModifiedDate)
                        : '-'}
                </Text>
            </ReBox>
        );
    } else {
        return null;
    }
};

export { Box };
