import React from 'react';
import Select from 'react-select';

import { useForm } from 'react-hook-form';

import { Box, Flex } from 'rebass';

import { UserData, UserLocation } from '../checkout';
import Message from './message';
import Details from './details';

type Props = {
    getUserData: (data: UserData & UserLocation, origin: number) => void;
};

const Form: React.FC<Props> = ({ getUserData }) => {
    const { handleSubmit, errors, register, control } = useForm();

    // const allProvinces = allCities.map(cityItem => ({
    //     value: cityItem.provinceId,
    //     label: cityItem.provinceName,
    // }));

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
                <Details
                    register={register}
                    errors={errors}
                    control={control}
                />
            </Flex>
        </Box>
    );
};

export { Form };
