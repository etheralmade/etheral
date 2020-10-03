import React from 'react';

import { Box, Text, Flex } from 'rebass';

import { Currencies } from 'state/reducers/currency-reducer';
import { getDate } from 'helper/get-date';
import StatusBadge, { BadgeTypes } from '../status-badge';

type Props = {
    oid: string;
    date: Date;
    paid: boolean;
    shipped: boolean;
    currency: Currencies;
    bg: string;
    focusOrder: (oid: string) => void;
};

const OrderBox: React.FC<Props> = ({
    oid,
    date,
    paid,
    shipped,
    currency,
    bg,
    focusOrder,
}) => {
    const textStyling = {
        fontFamily: 'body',
        fontSize: [1],
        color: 'black.0',
        fontWeight: 'bold',
        css: `
			 white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		`,
    };

    return (
        <Box
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
            onClick={() => focusOrder(oid)}
            data-testid="order-box"
        >
            <Text sx={{ gridColumn: '1/2' }} {...textStyling}>
                {oid}
            </Text>
            <Flex flexWrap="wrap" sx={{ gridColumn: '2/3' }}>
                <StatusBadge type={BadgeTypes.PAYMENT} paid={paid} />
                <StatusBadge type={BadgeTypes.SHIPPING} shipped={shipped} />
            </Flex>
            <Text sx={{ gridColumn: '3/4' }} {...textStyling}>
                {currency}
            </Text>
            <Text sx={{ gridColumn: '4/5' }} {...textStyling}>
                {getDate(date)}
            </Text>
        </Box>
    );
};

export { OrderBox };
