import React from 'react';
import { Link } from '@reach/router';
import { useForm, Controller } from 'react-hook-form';
import { get, startCase, set } from 'lodash';

import { Box, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';
import { ValueType, ActionMeta } from 'react-select';

import { extractTextArea } from 'helper/extract-textarea';
import Select from 'components/select';

type Props = {
    availableSizes: string;
    gems: {
        withGems: boolean;
        gemTypes: string;
        gemSizes: string;
    };
};

type OrderData = {
    size: string;
    quantity: number;
    gemType?: string;
    gemSize?: string;
};

type Input = {
    size: string;
    quantity: string;
    'gem-type'?: string;
    'gem-size'?: string;
};

const ProductForm: React.FC<Props> = ({ availableSizes, gems }) => {
    const { control, handleSubmit, errors } = useForm<Input>();

    const sizes = extractTextArea(availableSizes);
    const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const submit = (data: any) => {
        console.log(extractData(data));
    };

    /**
     * extract data from input(s) => provided by react-hook-form
     * @param data
     */
    const extractData = (data: any): OrderData => {
        const temp = {
            size: get(data, 'size.value', ''),
            quantity: parseInt(get(data, 'quantity.value', 0), 10),
            gemType: get(data, 'gem-type.value', undefined),
            gemSize: get(data, 'gem-size.value', undefined),
        };

        if (temp.gemSize) {
            set(temp, 'gemSize', startCase(temp.gemSize.toLowerCase()));
        }

        if (temp.gemType) {
            set(temp, 'gemType', startCase(temp.gemType.toLowerCase()));
        }

        return temp;
    };

    const textStyling = {
        variant: 'productName',
        mr: [0, 4],
        mb: [3],
        width: ['100%', '100%', '100%', 'fit-content'],
    };

    // overcome error => flexWrap: type 'string' is not compatible to type 'wrap' | 'nowrap' | ...
    type FlexWrapType = 'wrap';
    const containerFlexWrap: FlexWrapType = 'wrap';

    const containerStyling = {
        alignItems: 'center',
        flexWrap: containerFlexWrap,
        justifyContent: 'space-between',
        my: [6],
    };

    const selectStyling = {
        width: ['100%', '100%', '100%', '60%'],
    };

    return (
        <Box as="form" onSubmit={handleSubmit(submit)}>
            {/* render if product's withGems property is checked */}
            {gems && gems.withGems ? (
                <>
                    {/* gem's type form */}
                    <Flex className="gem-type" {...containerStyling}>
                        <Text id="gem-type-label" {...textStyling}>
                            GEMS
                        </Text>
                        <Box {...selectStyling}>
                            <Controller
                                control={control}
                                name="gem-type"
                                id="gem-type"
                                defaultValue={''}
                                rules={{
                                    required: true,
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <Select
                                        options={extractTextArea(gems.gemTypes)}
                                        placeholder="select gems diameter"
                                        aria-labelledby="gem-type-label"
                                        handleChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                    />
                                )}
                            />
                        </Box>
                    </Flex>

                    {/* gem's size form */}
                    <Flex className="gem-size" {...containerStyling}>
                        <Text id="gem-size-label" {...textStyling}>
                            GEMS DIAMETER
                        </Text>
                        <Box {...selectStyling}>
                            <Controller
                                control={control}
                                name="gem-size"
                                id="gem-size"
                                defaultValue={''}
                                rules={{
                                    required: true,
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <Select
                                        options={extractTextArea(gems.gemSizes)}
                                        placeholder="select gems"
                                        aria-labelledby="gem-size-label"
                                        handleChange={onChange}
                                        onBlur={onBlur}
                                        selected={value}
                                    />
                                )}
                            />
                        </Box>
                    </Flex>
                </>
            ) : null}

            {/* size form */}
            <Flex
                className="size"
                {...containerStyling}
                sx={{
                    position: 'relative',
                    a: {
                        textDecoration: 'none',
                        width: ['unset', 'unset', '10%', '10%', 'fit-content'],
                        position: ['unset', 'unset', 'unset', 'absolute'],
                        right: ['unset', 'unset', 'unset', '-5vw', '-7vw'],
                        top: ['unset', 'unset', 'unset', ' -10%', '20%'],
                    },
                }}
            >
                <Text id="size-label" {...textStyling}>
                    SIZES
                </Text>
                <Box
                    width={['100%', '100%', '80%', '60%']}
                    mb={[2]}
                    mr={[0, 0, 4, 0]}
                >
                    <Controller
                        control={control}
                        name="size"
                        id="size"
                        defaultValue={''}
                        rules={{
                            required: true,
                        }}
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                options={sizes}
                                placeholder="select size"
                                aria-labelledby="size-label"
                                handleChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                            />
                        )}
                    />
                </Box>
                <Link to="/" role="button">
                    <Text variant="productPrice">SIZE GUIDE</Text>
                </Link>
            </Flex>

            {/* quantity form */}
            <Flex className="quantity" {...containerStyling}>
                <Text id="quantity-label" {...textStyling}>
                    QUANTITY
                </Text>
                <Box {...selectStyling}>
                    <Controller
                        control={control}
                        name="quantity"
                        id="quantity"
                        defaultValue={''}
                        rules={{
                            required: true,
                        }}
                        render={({ onChange, onBlur, value }) => (
                            <Select
                                options={quantities}
                                placeholder="select quantity"
                                aria-labelledby="quantity-label"
                                handleChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                            />
                        )}
                    />
                </Box>
            </Flex>

            {/* buttons */}
            <Flex {...containerStyling}>
                <Input
                    type="submit"
                    variant="buttons.primary"
                    value="ADD TO CART"
                />
            </Flex>
        </Box>
    );
};

export { ProductForm };

/**
 * <Controller
                control={control}
                name="city"
                id="city"
                defaultValue={-1}
                rules={{
                    required: true,
                    validate: {
                        provinceIncorrect: value => cityValidation(value),
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
 */
