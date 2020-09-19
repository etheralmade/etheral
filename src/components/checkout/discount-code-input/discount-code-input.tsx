import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Box, Text } from 'rebass';
import { Input } from '@rebass/forms';

type Props = {
    db: firebase.firestore.Firestore;
};

type Fields = {
    discountCodeInput: string;
};

const initialFields = {
    discountCodeInput: '',
};

const DiscountCodeInput: React.FC<Props> = ({ db }) => {
    const { control, errors, handleSubmit } = useForm<Fields>();

    const submitCode = (data: any) => {
        console.log(data);
    };

    return (
        <Box as="form" onSubmit={handleSubmit(submitCode)}>
            <Controller
                control={control}
                name="discountCodeInput"
                defaultValue={initialFields.discountCodeInput}
                rules={{
                    maxLength: 6,
                }}
                render={({ onChange, ...props }) => (
                    <Input
                        variant="variants.textInput"
                        type="text"
                        onChange={e => onChange(e.target.value.toUpperCase())} // forcing uppercase input
                        {...props}
                    />
                )}
            />
            {errors.discountCodeInput?.type === 'maxLength' && (
                <Text>
                    Discount code can&apos;t be longer than 6 characters
                </Text>
            )}

            <Input
                type="submit"
                variant="buttons.primary"
                value="GET MY DISCOUNT"
            />
        </Box>
    );
};

export { DiscountCodeInput };
