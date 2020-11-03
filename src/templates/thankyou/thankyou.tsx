import React from 'react';
// import styling libs
import { Box } from 'rebass';
// import local components

export type Props = {
    total: number;
    paymentNo: number;
    paymentName: string;
    expired: string;
    currency: string;
    // images: {}
};

const Thankyou: React.FC<Props> = ({
    total,
    paymentNo,
    paymentName,
    expired,
}) => {
    return (
        <Box className="content">
            <h2>Hi thank you for your order!</h2>
            <p>
                Please transfer IDR {total} to {paymentNo} with the following
                name: {paymentName} before {expired}
            </p>
        </Box>
    );
};

export { Thankyou };
