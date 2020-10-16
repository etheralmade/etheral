import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Box, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';

type Props = {
    db: firebase.firestore.Firestore;
    applyCode: (code: string, value: number) => void;
};

type Fields = {
    discountCodeInput: string;
};

const initialFields = {
    discountCodeInput: '',
};

const CODE_NOT_EXISTS = "Discount code doesn't exsist!";
const CODE_EXPIRED = 'Discount code is already expired';
const CODE_ALREADY_USED = 'Discount code has already been used.';
const UNKNOWN = 'Oops, something went wrong';

const DiscountCodeInput: React.FC<Props> = ({ db, applyCode }) => {
    const [onError, setOnError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [appliedCodes, setAppliedCodes] = useState<string[]>([]);

    const { control, errors, handleSubmit } = useForm<Fields>();

    const dbDiscountRef = db.collection('discount');

    // get all applied codes from localstorage.
    useEffect(() => {
        getAppliedCodes();
    }, []);

    // fetch data from fs and check if discount code is available
    const checkCode = async (code: string) => {
        if (appliedCodes.includes(code)) {
            setOnError(true);
            setErrMsg(CODE_ALREADY_USED);

            return;
        }

        const doc = await dbDiscountRef.doc(code).get();
        if (doc.exists) {
            const data = doc.data();

            // check if document contains data.
            if (data) {
                const date = data.expiresIn.toDate();

                // check if the code is already expired.
                if (date.getTime() < new Date().getTime()) {
                    await setOnError(true);
                    await setErrMsg(CODE_EXPIRED);
                    return;
                }

                // apply discount code if nothing goes wrong
                applyCode(code, parseInt(data.value, 10));
            } else {
                await setOnError(true);
                await setErrMsg(UNKNOWN);
            }
        } else {
            await setOnError(true);
            await setErrMsg(CODE_NOT_EXISTS);
        }
    };

    const submitCode = (data: Fields) => {
        checkCode(data.discountCodeInput);
    };

    /**
     * get all applied codes from the localstorage.
     * note: almost the same as saveDiscountCode function from checkout.tsx
     */
    const getAppliedCodes = () => {
        const LOCALSTORAGE_KEY = 'appliedCodes'; // key.

        if (window) {
            const codesStringified = window.localStorage.getItem(
                LOCALSTORAGE_KEY
            );

            if (!codesStringified) {
                setAppliedCodes([]);
                return;
            }

            // splitting the saved code.
            const codes = codesStringified
                .split(';')
                .map(code => window.atob(code));
            setAppliedCodes(codes);
        }
    };

    return (
        <Box>
            <Flex
                as="form"
                justifyContent="space-between"
                onSubmit={handleSubmit(submitCode)}
            >
                <Controller
                    control={control}
                    name="discountCodeInput"
                    defaultValue={initialFields.discountCodeInput}
                    rules={{
                        maxLength: 6,
                        minLength: 6,
                    }}
                    render={({ onChange, ...props }) => (
                        <Input
                            variant="variants.authInput"
                            type="text"
                            placeholder="ENTER YOUR DISCOUNT CODE HERE"
                            aria-label="Discount code input"
                            maxLength={6}
                            onChange={e =>
                                onChange(e.target.value.toUpperCase())
                            } // forcing uppercase input
                            sx={{ width: '49%' }}
                            {...props}
                        />
                    )}
                />

                <Input
                    type="submit"
                    variant="buttons.primary"
                    aria-label="Apply discount code"
                    value="GET MY DISCOUNT"
                    sx={{ border: '1px solid #222', width: '49%' }}
                />
            </Flex>
            {(errors.discountCodeInput?.type === 'maxLength' ||
                errors.discountCodeInput?.type === 'minLength') && (
                <Text display="block" variant="formError" role="alert" mt={[3]}>
                    Discount code must be 6 character long
                </Text>
            )}
            {onError && (
                <Text role="alert" display="block" variant="formError" mt={[3]}>
                    {errMsg}
                </Text>
            )}
        </Box>
    );
};

export { DiscountCodeInput, CODE_NOT_EXISTS, CODE_EXPIRED, UNKNOWN };
