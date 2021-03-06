import React, { useState } from 'react';
// import styling libs
import { Box, Flex, Heading, Button, Text } from 'rebass';
import { Input, Label } from '@rebass/forms';
// import local components

import bcaImg from './assets/BCA_logo_Bank_Central_Asia.png';
import mandiriImg from './assets/Mandiri_logo.png';

type Props = {
    paymentError: boolean;
    handleClickPay: (args: RadioInput) => void;
};

export type RadioInput = {
    method: 'va' | 'banktransfer' | '';
    channel: 'mandiri' | 'bca' | '';
};

/**
 * component to determine which payment method the user is going to use
 */
const Payment: React.FC<Props> = ({ paymentError, handleClickPay }) => {
    const [payment, setPayment] = useState<RadioInput>({
        method: '',
        channel: '',
    });
    const [error, setError] = useState(false);

    const submit = () => {
        if (payment.method === '' && payment.channel === '') {
            setError(true);
        } else {
            setError(false);
            handleClickPay(payment);
        }
    };

    // pass va and channel to parent

    const inputStyling = {
        display: 'none',
        '&:checked + label': { borderColor: 'black.0' },
    };

    const labelStyling = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'body',
        fontSize: [1, 1, 2],
        transition: '0.2s',
        border: '1px solid transparent',
        py: [5],
        px: [0, 0, 3],
        cursor: 'pointer',
        '& img': {
            width: [128, 128, 82, 128],
            mb: [5],
        },
    };

    return (
        <Box
            py={[4]}
            width={['100%', '100%', '48%']}
            sx={{
                borderColor: 'black.0',
                borderWidth: 0,
                borderStyle: 'solid',
                borderTopWidth: [1, 1, 0],
            }}
        >
            <Heading
                as="h3"
                variant="h4"
                fontSize={[1, 1, 3]}
                mb={[6]}
                textAlign="left"
            >
                PAYMENT
            </Heading>

            <Flex justifyContent="space-between">
                <Box width="48%">
                    <Input
                        type="radio"
                        id="mandiri-va"
                        name="payment-method"
                        sx={inputStyling}
                        onChange={() => {
                            setPayment({ method: 'va', channel: 'mandiri' });
                        }}
                    />
                    <Label htmlFor="mandiri-va" sx={labelStyling}>
                        <img src={mandiriImg} alt="Logo bank mandiri" />
                        Mandiri (Virtual Account)
                    </Label>
                </Box>

                <Box width="48%">
                    <Input
                        type="radio"
                        id="bca-transfer"
                        name="payment-method"
                        sx={inputStyling}
                        onChange={() => {
                            setPayment({
                                method: 'banktransfer',
                                channel: 'bca',
                            });
                        }}
                    />
                    <Label htmlFor="bca-transfer" sx={labelStyling}>
                        <img src={bcaImg} alt="Logo bank BCA" />
                        BCA (Transfer Bank)
                    </Label>
                </Box>
            </Flex>
            <Button
                onClick={submit}
                disabled={payment.method === '' && payment.channel === ''}
                mt={[6]}
                sx={{ float: ['center', 'center', 'left'] }}
            >
                PAY AND PLACE ORDER
            </Button>
            {/* alert if pay is clicked without setting a payment method */}
            {error && (
                <Text
                    variant="formError"
                    role="alert"
                    mt={[4]}
                    sx={{ float: ['center', 'center', 'left'] }}
                >
                    Please choose a payment method
                </Text>
            )}

            {paymentError && (
                <Text
                    variant="formError"
                    role="alert"
                    my={[4]}
                    sx={{ float: ['center', 'center', 'left'] }}
                >
                    Oops! Problem occured when processing your order. Please
                    contact{' '}
                    <a href="mailto:asketheral@gmail.com">
                        asketheral@gmail.com
                    </a>{' '}
                    or try again later
                </Text>
            )}
        </Box>
    );
};

export { Payment };
