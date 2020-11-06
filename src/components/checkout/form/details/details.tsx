import React, { useState, useEffect } from 'react';
import { uniq, findIndex, get } from 'lodash';
import { ValueType } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Heading, Flex, Text, Button } from 'rebass';
import { Label, Input } from '@rebass/forms';

import Select from 'components/select';
import Checkbox from 'components/checkbox';

import useAllCities from 'helper/use-all-cities';

type Props = {};

/**
 * form to input details on checkout component
 */
const Details: React.FC<Props> = () => {
    const { register, control, errors } = useFormContext();

    const [province, setProvince] = useState('');
    const [selectCityOptions, setSelectCityOptions] = useState<string[]>([]);

    const { allCities } = useAllCities();
    const allProvinces = allCities.map(cityItem => cityItem.provinceName);

    useEffect(() => {
        if (province === '') {
            setSelectCityOptions([]);
        } else {
            const options = allCities
                .filter(cityItem => cityItem.provinceName === province)
                .map(cityItem => cityItem.name);

            setSelectCityOptions(options);
        }
    }, [province]);

    const handleChangeProvince = (
        value: ValueType<{
            value: string;
            label: string;
        }>
    ) => {
        setProvince((value as any).value);
    };

    const cityValidation = (
        value: ValueType<{
            value: string;
            label: string;
        }>
    ) => {
        if (value) {
            const cityOnFocusIndex = findIndex(
                allCities,
                o => o.name === (value as any).value
            );
            return allCities[cityOnFocusIndex].provinceName === province;
        } else {
            return false;
        }
    };

    const textAlignAttr: 'left' | 'center' = 'left';

    // styling for error msgs, taken from login.tsx
    const errorStyling = {
        variant: 'formError',
        textAlign: textAlignAttr,
        mt: [3],
        role: 'alert',
    };

    return (
        <Box
            width={['100%', '100%', '48%']}
            // px={[0, 0, 6]}
            mt={[5, 5, 0]}
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
                fontSize={[2, 2, 3]}
                my={[6]}
                textAlign="left"
            >
                SHIPPING ADDRESS
            </Heading>

            <Flex flexWrap="wrap" justifyContent="space-between">
                {/* first name */}
                <Box width="48%">
                    <Label htmlFor="first-name" variant="text.formLabel" mt={0}>
                        FIRST NAME
                    </Label>
                    <Input
                        type="text"
                        id="first-name"
                        name="firstName"
                        variant="variants.authInput"
                        placeholder="First Name"
                        ref={register({ required: true })}
                    />
                    {errors.firstName && (
                        <Text {...errorStyling}>Please enter your name</Text>
                    )}
                </Box>

                {/* last name */}
                <Box width="48%">
                    <Label htmlFor="last-name" variant="text.formLabel" mt={0}>
                        LAST NAME
                    </Label>
                    <Input
                        type="text"
                        id="last-name"
                        name="lastName"
                        variant="variants.authInput"
                        placeholder="Last Name"
                        ref={register}
                    />
                </Box>

                {/* phone */}
                <Box width="48%">
                    <Label htmlFor="phone" variant="text.formLabel">
                        PHONE
                    </Label>
                    <Input
                        type="number"
                        id="phone"
                        name="phone"
                        variant="variants.authInput"
                        placeholder="Phone"
                        ref={register({ required: true })}
                    />
                    {errors.phone && (
                        <Text {...errorStyling}>
                            Please enter your phone number
                        </Text>
                    )}
                </Box>

                {/* country => temp: INDONESIA && disabled = true */}
                <Box width="48%">
                    <Label htmlFor="country" variant="text.formLabel">
                        COUNTRY
                    </Label>
                    <Input
                        type="text"
                        id="country"
                        name="country"
                        variant="variants.authInput"
                        placeholder="Country"
                        value="INDONESIA"
                        defaultValue="INDONESIA"
                        disabled={true}
                        ref={register({ required: true })}
                    />
                </Box>

                {/* email */}
                <Box width="100%">
                    <Label htmlFor="email" variant="text.formLabel">
                        EMAIL
                    </Label>
                    <Input
                        type="text"
                        id="email"
                        name="email"
                        variant="variants.authInput"
                        placeholder="Email address"
                        ref={register}
                    />
                </Box>

                {/* company */}
                <Box width="100%">
                    <Label htmlFor="company" variant="text.formLabel">
                        COMPANY
                    </Label>
                    <Input
                        type="text"
                        id="company"
                        name="company"
                        variant="variants.authInput"
                        placeholder="Company (optional)"
                        ref={register}
                    />
                </Box>

                {/* address */}
                <Box width="100%">
                    <Label htmlFor="address" variant="text.formLabel">
                        ADDRESS
                    </Label>
                    <Input
                        type="text"
                        id="address"
                        name="address"
                        variant="variants.authInput"
                        placeholder="Address"
                        ref={register({ required: true })}
                    />
                    {errors.address && (
                        <Text {...errorStyling}>Please enter your address</Text>
                    )}
                </Box>

                {/* apartment suite etc. */}
                <Box width="100%">
                    <Label htmlFor="add-address" variant="text.formLabel">
                        ADDITIONAL ADDRESS
                    </Label>
                    <Input
                        type="text"
                        id="add-address"
                        name="addAddress"
                        variant="variants.authInput"
                        placeholder="Apartment, Suite, etc. (optional)"
                        ref={register}
                    />
                </Box>

                {/* city */}
                <Box width="32%">
                    <Label htmlFor="city" variant="text.formLabel">
                        CITY
                    </Label>
                    <Controller
                        control={control}
                        name="city"
                        id="city"
                        defaultValue=""
                        rules={{
                            required: true,
                            validate: {
                                provinceIncorrect: value =>
                                    cityValidation(value),
                            },
                        }}
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                placeholder="city"
                                handleChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                options={selectCityOptions}
                            />
                        )}
                    />
                    {get(errors, 'city.required') && (
                        <Text {...errorStyling}>Please enter your city</Text>
                    )}
                    {get(errors, 'city.type', '') === 'provinceIncorrect' ? (
                        <Text {...errorStyling}>
                            Your city and region is not compatible.
                        </Text>
                    ) : null}
                </Box>

                {/* province */}
                <Box width="32%">
                    <Label htmlFor="province" variant="text.formLabel">
                        STATE / REGION
                    </Label>
                    <Controller
                        name="province"
                        defaultValue=""
                        id="province"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                placeholder="province"
                                handleChange={val => {
                                    handleChangeProvince(val);
                                    onChange(val);
                                }}
                                options={uniq(allProvinces)}
                                onBlur={onBlur}
                                selected={value}
                            />
                        )}
                    />
                    {errors.province && (
                        <Text {...errorStyling}>Please enter your city</Text>
                    )}
                </Box>

                {/* postal code */}
                <Box width="32%">
                    <Label htmlFor="postal" variant="text.formLabel">
                        POSTAL CODE
                    </Label>
                    <Input
                        type="number"
                        id="postal"
                        name="postal"
                        variant="variants.authInput"
                        placeholder="Postal code"
                        ref={register({ required: true })}
                    />
                    {errors.postal && (
                        <Text {...errorStyling}>
                            Please enter your postal code
                        </Text>
                    )}
                </Box>

                <Box width="100%">
                    <Checkbox
                        id="save"
                        name="save"
                        text="Save this information for next order"
                    />
                </Box>
            </Flex>

            {/* <input type="submit" value="confirm details" /> */}
            <Button mt={[4]} type="submit" width="100%">
                CONFIRM DETAILS
            </Button>
        </Box>
    );
};

export { Details };
