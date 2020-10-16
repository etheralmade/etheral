import React, { useEffect } from 'react';
import { toPairs } from 'lodash';
import { useForm, FormProvider } from 'react-hook-form';

import { Box, Flex } from 'rebass';

import { UserData, UserLocation } from '../checkout';
import Message from './message';
import Details from './details';
import useAllCities from 'helper/use-all-cities';

type Props = {
    getUserData: (data: UserData & UserLocation, origin: number) => void;
};

// localstorage key identifier
const LOCALSTORAGE_KEY = 'userData';

const Form: React.FC<Props> = ({ getUserData }) => {
    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    const { filterByStr } = useAllCities();

    // fetch data from localstorage.
    useEffect(() => {
        loadUserData();
    }, []);

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

        if (save) {
            const dataStringified = JSON.stringify(data);

            saveUserData(dataStringified);
        }
    };

    /**
     * save user data to local storage
     * @param data stringified data
     */
    const saveUserData = (data: string) => {
        if (window) {
            window.localStorage.setItem(LOCALSTORAGE_KEY, data);
        }
    };

    /**
     * load user data from localstorage
     */
    const loadUserData = () => {
        if (window) {
            const dataStringified = window.localStorage.getItem(
                LOCALSTORAGE_KEY
            );

            if (!dataStringified) {
                return; // no data available, abort function.
            }

            // parse data string
            const data = JSON.parse(dataStringified);

            // set data to an array of [key, value] array.
            toPairs(data).forEach(([key, value]) => {
                if (key !== undefined && value !== undefined) {
                    setValue(key, value);
                }
            });
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
