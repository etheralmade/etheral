import React, { useState, useEffect } from 'react';
import { uniq, findIndex, get } from 'lodash';
import { ValueType } from 'react-select';
import { Controller } from 'react-hook-form';

import { Box, Heading } from 'rebass';
import { Label, Input } from '@rebass/forms';

import Select from 'components/select';

import useAllCities from 'helper/use-all-cities';

/**
 * all props are the return value of useForm() => react-hook-form
 */
type Props = {
    control: any;
    register: any;
    errors: any;
};

type SelectProps = {
    value: string;
    label: string;
};

/**
 * form to input details on checkout component
 */
const Details: React.FC<Props> = ({ register, control }) => {
    const [province, setProvince] = useState('');
    const [selectCityOptions, setSelectCityOptions] = useState<string[]>([]);

    const { allCities } = useAllCities();
    const allProvinces = allCities.map(cityItem => cityItem.provinceName);

    // const originCity = allCities.filter(
    //     cityItem => cityItem.name.toUpperCase() === 'JAKARTA BARAT'
    // )[0];

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

    return (
        <Box>
            <Label htmlFor="province" variant="text.formLabel">
                Isi provinsi
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

            <Label htmlFor="city" variant="text.formLabel">
                Isi kota
            </Label>
            <Controller
                control={control}
                name="city"
                id="city"
                defaultValue=""
                rules={{
                    required: true,
                    validate: {
                        provinceIncorrect: value => cityValidation(value),
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

            {/* {get(errors, 'city.type', '') === 'provinceIncorrect' && (
                <p>Nama kota dan lokasi provinsi tidak tepat</p>
            )} */}
            <input type="submit" value="confirm details" />
        </Box>
    );
};

export { Details };
