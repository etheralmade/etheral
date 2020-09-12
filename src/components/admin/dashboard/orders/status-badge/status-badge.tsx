import React from 'react';

import { Text, TextProps } from 'rebass';
// import styling libs
// import local components

type Props = {
    type: BadgeTypes;
    paid?: boolean;
    shipped?: boolean;
};

export enum BadgeTypes {
    PAYMENT,
    SHIPPING,
}

const StatusBadge: React.FC<Props & TextProps> = ({
    type,
    paid,
    shipped,
    css,
    ...rest
}) => {
    console.log(css);

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
    } else {
        return <h2>WTF</h2>;
    }
};

export { StatusBadge };
