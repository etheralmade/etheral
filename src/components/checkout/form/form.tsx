import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { uniqBy, findIndex, get } from 'lodash';
import { useForm, Controller } from 'react-hook-form';

import { Box, Flex } from 'rebass';

import useAllCities from 'helper/use-all-cities';
import { UserData, UserLocation } from '../checkout';
import Message from './message';

type Props = {
    getUserData: (data: UserData & UserLocation, origin: number) => void;
};

type SelectProps = {
    value: number;
    label: string;
};

const Form: React.FC<Props> = ({ getUserData }) => {
    const [province, setProvince] = useState(-1);
    const [selectCityOptions, setSelectCityOptions] = useState<SelectProps[]>(
        []
    );
    const { allCities } = useAllCities();
    const originCity = allCities.filter(
        cityItem => cityItem.name.toUpperCase() === 'JAKARTA BARAT'
    )[0];

    const { control, handleSubmit, errors, register } = useForm();

    const allProvinces = allCities.map(cityItem => ({
        value: cityItem.provinceId,
        label: cityItem.provinceName,
    }));

    useEffect(() => {
        if (province === -1) {
            setSelectCityOptions([]);
        } else {
            const options = allCities
                .filter(cityItem => cityItem.provinceId === province)
                .map(cityItem => ({
                    value: cityItem.cityId,
                    label: cityItem.name,
                }));
            setSelectCityOptions(options);
        }
    }, [province]);

    const handleChangeProvince = ({ value }: SelectProps) => {
        setProvince(value);
    };

    const cityValidation = ({ value }: SelectProps) => {
        if (value) {
            const cityOnFocusIndex = findIndex(
                allCities,
                o => o.cityId === value
            );
            return allCities[cityOnFocusIndex].provinceId === province;
        } else {
            return false;
        }
    };

    const submit = (data: any) => {
        // const userData: UserData & UserLocation = {
        //     cityId: get(data, 'city.value', 0),
        //     provinceId: get(data, 'province.value', 0),
        //     name: 'Jane Doe',
        //     email: 'Jane.doe@email.email',
        //     address: 'Storkowerstrasse',
        //     phone: 1231432123,
        //     postal: 213456,
        // };

        // getUserData(userData, originCity.cityId);
        console.log(data);
    };

    return (
        <Box as="form" onSubmit={handleSubmit(submit)} px={[4]}>
            <Flex flexDirection={['column', 'column', 'row']}>
                <Message register={register} />
                <Box>
                    <label htmlFor="province">Isi provinsi</label>
                    <Controller
                        control={control}
                        defaultValue={-1}
                        name="province"
                        id="province"
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                onChange={e => {
                                    handleChangeProvince(e as SelectProps);
                                    onChange(e);
                                }}
                                onBlur={onBlur}
                                selected={value}
                                options={uniqBy(allProvinces, 'value')}
                            />
                        )}
                        rules={{ required: true }}
                    />
                    <label htmlFor="city">Isi kota</label>

                    <Controller
                        control={control}
                        name="city"
                        id="city"
                        defaultValue={-1}
                        rules={{
                            required: true,
                            validate: {
                                provinceIncorrect: value =>
                                    cityValidation(value),
                            },
                        }}
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                options={selectCityOptions}
                            />
                        )}
                    />
                    {get(errors, 'city.type', '') === 'provinceIncorrect' && (
                        <p>Nama kota dan lokasi provinsi tidak tepat</p>
                    )}
                    <input type="submit" value="confirm details" />
                </Box>
            </Flex>
        </Box>
    );
};

export { Form };
