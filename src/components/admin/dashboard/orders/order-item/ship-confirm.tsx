import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';

type Props = {
    confirmShipping: (data: Inputs) => void;
};

export type Inputs = {
    shippingDate: Date;
    trackingNum: string;
    shippedBy: string;
};

const ShippingConfirmation: React.FC<Props> = ({ confirmShipping }) => {
    const [viewForm, setViewForm] = useState(false);
    const { register, handleSubmit } = useForm();

    const submit = (data: Inputs) => {
        confirmShipping(data);
        setViewForm(false);
    };

    return viewForm ? (
        <Box
            as="form"
            data-testid="shipping-info-form"
            css={`
                & > input,
                & > label {
                    font-family: 'Montserrat', sans-serif;
                }
            `}
            onSubmit={handleSubmit(submit)}
        >
            <Label mb={[2, 2, 3]} htmlFor="shipping-date">
                Shipping date
            </Label>
            <Input
                mb={[4, 4, 5]}
                id="shipping-date"
                name="shippingDate"
                type="date"
                ref={register}
            />
            <Label mb={[2, 2, 3]} htmlFor="tracking-num">
                Tracking number
            </Label>
            <Input
                mb={[4, 4, 5]}
                id="tracking-num"
                name="trackingNum"
                ref={register}
            />
            <Label mb={[2, 2, 3]} htmlFor="shipped-by">
                Shipped by
            </Label>
            <Input
                mb={[4, 4, 5]}
                id="shipped-by"
                name="shippedBy"
                ref={register}
            />
            <Input
                value="Confirm"
                type="submit"
                bg="brown.2"
                color="#fff"
                css={`
                    outline: none !important;
                    &:hover {
                        cursor: pointer;
                    }
                `}
                width="fit-content"
            />
        </Box>
    ) : (
        <Button variant="primary" onClick={() => setViewForm(true)}>
            Confirm Shipping
        </Button>
    );
};

export default ShippingConfirmation;
