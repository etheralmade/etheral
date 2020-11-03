import React from 'react';
// import styling libs
import { Box, Heading, Text } from 'rebass';
// import local components

import thanks from './assets/thx.png';
import thanksMobile from './assets/thx-mobile.png';

/**
 * total: Total amount to be paid on a transaction
 * paymentNo: Payment Number (e.g no Rek)
 * paymentName: Account owner's name. to which account the amount is to be transfered.
 * expired: Date, when the transaction is expired.
 */
export type Props = {
    total: number;
    paymentNo: number;
    paymentName: string;
    expired: string;
    currency: string;
};

/**
 * Thankyou page. Shown after user completes a transaction
 * @param param0 Props
 */
const Thankyou: React.FC<Props> = ({
    total,
    paymentNo,
    paymentName,
    expired,
    currency,
}) => {
    const THANKYOU_MSG =
        'THANK YOU FOR YOUR PURCHASE!\nCHECK YOUR EMAIL FOR YOUR ORDER CONFIRMATION';

    return (
        <Box className="content">
            {/* separated content container from the inner content */}
            <Box
                className="inner-wrapper"
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: ['80vh', '120vh', '55vh', '65vh'],
                    minHeight: ['unset', 'unset', '400px'],
                    maxHeight: ['unset', '380px', 'unset', '740px'],
                }}
            >
                <Box
                    className="bg"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        img: {
                            height: 'auto',
                            width: '100%',

                            '&.thx-mobile': {
                                display: ['block', 'none'],
                            },
                            '&.thx-desktop': {
                                display: ['none', 'block'],
                            },
                            transform: [
                                'unset',
                                'unset',
                                'unset',
                                'unset',
                                'translateY(-200px)',
                            ],
                        },
                    }}
                >
                    <img
                        alt="Thankyou"
                        src={thanksMobile}
                        className="thx-mobile"
                    />
                    <img alt="Thankyou" src={thanks} className="thx-desktop" />
                </Box>
                <Box
                    sx={{ zIndex: 2, position: 'relative' }}
                    py={[128]}
                    px={[4, 6, 7, 9]}
                >
                    <Heading
                        color="#000"
                        fontWeight="medium"
                        textAlign={['center', 'left']}
                        fontSize={[2]}
                    >
                        {THANKYOU_MSG}
                    </Heading>
                    <Text
                        fontFamily="body"
                        fontSize={[1]}
                        textAlign={['center', 'left']}
                        mt={[5]}
                        color="#000"
                        fontWeight="medium"
                    >
                        Please transfer{' '}
                        <strong>
                            {currency} {total}
                        </strong>{' '}
                        before <strong>{expired}</strong> to:
                        <br />
                        Name: <strong>{paymentName}</strong>
                        <br />
                        No: <strong>{paymentNo}</strong>
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export { Thankyou };
