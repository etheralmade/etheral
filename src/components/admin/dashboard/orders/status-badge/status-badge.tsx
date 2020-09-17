import React from 'react';

import { Text } from 'rebass';

import { getDate } from 'helper/get-date';

type Props = {
    type: BadgeTypes;
    paid?: boolean;
    shipped?: boolean;
    date?: Date;
    update?: boolean;
};

export enum BadgeTypes {
    PAYMENT,
    SHIPPING,
    DATE,
    SETTINGS,
}

const StatusBadge: React.FC<Props> = ({
    type,
    paid,
    shipped,
    date,
    update,
    ...rest
}) => {
    if (type === BadgeTypes.PAYMENT && paid !== undefined) {
        return (
            <Text
                m={1}
                sx={{ borderRadius: 3 }}
                variant={paid ? 'statusBadgePaid' : 'statusBadgeNotPaid'}
                {...rest}
            >
                {paid ? 'Paid' : 'Not Paid'}
            </Text>
        );
    } else if (type === BadgeTypes.SHIPPING && shipped !== undefined) {
        return (
            <Text
                m={1}
                sx={{ borderRadius: 3 }}
                variant={
                    shipped ? 'statusBadgeShipped' : 'statusBadgeNotShipped'
                }
                {...rest}
            >
                {shipped ? 'Shipped' : 'Not Shipped'}
            </Text>
        );
    } else if (type === BadgeTypes.DATE && date !== undefined) {
        return (
            <Text
                m={1}
                sx={{ borderRadius: 3 }}
                variant={'statusBadgeDate'}
                {...rest}
            >
                Order date: {getDate(date)}
            </Text>
        );
    } else if (type === BadgeTypes.SETTINGS && update !== undefined) {
        return (
            <Text
                m={1}
                sx={{ borderRadius: 3 }}
                variant={update ? 'statusBadgeUpdate' : 'statusBadgeNew'}
                {...rest}
            >
                {update ? 'Update' : 'New'}
            </Text>
        );
    } else {
        return <h2>WTF</h2>;
    }
};

export { StatusBadge };
