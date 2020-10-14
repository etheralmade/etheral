import React from 'react';
import { useForm } from 'react-hook-form';
// import styling libs
import { Box, Heading, Text, Button, Flex } from 'rebass';
import { Input, Label } from '@rebass/forms';
// import local components

type Props = {
    yes: (code: string, value: number, expiresIn: Date) => Promise<void>;
    no: () => void;
};

type Fields = {
    code: string;
    value: string;
    expiresIn: string;
};

const DiscountCode: React.FC<Props> = ({ yes, no }) => {
    const { register, handleSubmit, setValue, errors } = useForm<Fields>();

    const textAlignAttr: 'left' | 'center' = 'left';

    const errorStyling = {
        variant: 'formError',
        textAlign: textAlignAttr,
        mt: [3],
        role: 'alert',
    };

    const submit = (data: Fields) => {
        const { code, value, expiresIn } = data;

        // console.log({ code, parseInt(value, 10), new Date(expiresIn) })
        const val = parseInt(value, 10);
        const date = new Date(expiresIn);

        yes(code, val, date);
    };

    return (
        <Box
            bg="#fff"
            p={[4]}
            as="form"
            onSubmit={handleSubmit(submit)}
            width={['80vw', '60vw', 500]}
        >
            <Heading>Add new discount code</Heading>
            <Box mt={[3]}>
                <Label
                    htmlFor="code"
                    variant="text.formLabel"
                    sx={{ fontSize: [1, 1, 1] }}
                >
                    Discount Code (6 Characters)
                </Label>
                <Input
                    variant="variants.authInput"
                    ref={register({
                        required: true,
                        minLength: 6,
                        maxLength: 6,
                    })}
                    type="text"
                    name="code"
                    id="code"
                    maxLength={6}
                    onChange={e => {
                        setValue('code', e.target.value.toUpperCase());
                    }}
                />
                {errors.code && (
                    <Text {...errorStyling}>
                        Enter a discount code. (6 Characters)
                    </Text>
                )}

                <Label
                    htmlFor="value"
                    variant="text.formLabel"
                    sx={{ fontSize: [1, 1, 1] }}
                >
                    Discount value
                </Label>
                <Input
                    variant="variants.authInput"
                    ref={register({ required: true, max: 100, min: 0 })}
                    type="number"
                    name="value"
                    id="value"
                    max="100"
                    min="0"
                />
                {errors.value && (
                    <Text {...errorStyling}>
                        Discount value should be between 0 and 100
                    </Text>
                )}

                <Label
                    htmlFor="expiresIn"
                    variant="text.formLabel"
                    sx={{ fontSize: [1, 1, 1] }}
                >
                    Expiration Date
                </Label>
                <Input
                    variant="variants.authInput"
                    ref={register({ required: true })}
                    type="date"
                    name="expiresIn"
                    id="expiresIn"
                />
                {errors.expiresIn && (
                    <Text {...errorStyling}>
                        Please enter the code&apos;s expiration date
                    </Text>
                )}
            </Box>
            <Flex mt={[5]}>
                <Button type="submit">Add discount code</Button>
                <Button bg="misc.discount" color="#fff" ml={[3]} onClick={no}>
                    Cancel
                </Button>
            </Flex>
        </Box>
    );
};

export { DiscountCode };
