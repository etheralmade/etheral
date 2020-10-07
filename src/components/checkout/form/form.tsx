import React from 'react';
import { indexOf } from 'lodash';
import { useForm, FormProvider } from 'react-hook-form';

import { Box, Flex } from 'rebass';

import { UserData, UserLocation } from '../checkout';
import Message from './message';
import Details from './details';
import useAllCities from 'helper/use-all-cities';

type Props = {
    getUserData: (data: UserData & UserLocation, origin: number) => void;
};

const Form: React.FC<Props> = ({ getUserData }) => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const { filterByStr } = useAllCities();

    const submit = (data: any) => {
        const COUNTRY = 'INDONESIA'; // temporary unchangeable

        const origin = filterByStr('Jakarta Barat')[0];

        // shipment info
        const {
            address,
            addAddress,
            city,
            company,
            firstName,
            lastName,
            phone,
            postal,
            email,
            // province,
            save,
        } = data;

        // personalized msg info
        const { forName, fromName, message } = data;

        const cityName = city.value;
        // const provinceName = province.value;

        const cityOnFocus = filterByStr(cityName);

        if (cityOnFocus.length > 0) {
            const formattedAddr = `${
                company ? company + '. ' : ''
            }${address}${addAddress && '. ' + addAddress}`;

            const userData: UserData & UserLocation = {
                cityId: cityOnFocus[0].cityId,
                provinceId: cityOnFocus[0].provinceId,
                name: `${firstName}${lastName ? ' ' + lastName : ''}`,
                country: COUNTRY,
                email,
                address: formattedAddr,
                phone: parseInt(phone, 10),
                postal: parseInt(postal, 10),
                message: message
                    ? {
                          message,
                          forName,
                          fromName,
                      }
                    : undefined,
            };

            getUserData(userData, origin.cityId);
        }
    };

    return (
        <FormProvider {...methods}>
            <Box as="form" onSubmit={handleSubmit(submit)}>
                <Flex
                    flexDirection={['column', 'column', 'row-reverse']}
                    mt={[0, 0, 2]}
                    justifyContent="space-between"
                >
                    <Message />
                    <Details />
                </Flex>
            </Box>
        </FormProvider>
    );
};

export { Form };
