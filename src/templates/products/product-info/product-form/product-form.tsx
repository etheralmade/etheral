import React from 'react';
import { Link } from '@reach/router';

import { Box, Flex, Text } from 'rebass';
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

const ProductForm: React.FC<Props> = ({ availableSizes, gems }) => {
    const sizes = extractTextArea(availableSizes);
    const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const a = (
        value: ValueType<{
            value: string;
            label: string;
        }>,
        actionMeta: ActionMeta<{
            value: string;
            label: string;
        }>
    ) => {
        console.log(value);
        console.log(actionMeta);
    };

    const textStyling = {
        variant: 'productName',
        mr: [0, 4],
        mb: [3],
        width: ['100%'],
    };

    // overcome error => flexWrap: type 'string' is not compatible to type 'wrap' | 'nowrap' | ...
    type FlexWrapType = 'wrap';
    const containerFlexWrap: FlexWrapType = 'wrap';

    const containerStyling = {
        alignItems: 'center',
        flexWrap: containerFlexWrap,
        my: [6],
    };

    return (
        <Box>
            {/* render if product's withGems property is checked */}
            {gems && gems.withGems ? (
                <>
                    {/* gem's type form */}
                    <Flex className="gem-size" {...containerStyling}>
                        <Text id="gem-size-label" {...textStyling}>
                            GEMS
                        </Text>
                        <Box width={['100%']} mr={[4]}>
                            <Select
                                options={extractTextArea(gems.gemTypes)}
                                handleChange={a}
                                placeholder="select gems"
                                aria-labelledby="gem-size-label"
                            />
                        </Box>
                    </Flex>

                    {/* gem's size form */}
                    <Flex className="gem-type" {...containerStyling}>
                        <Text id="gem-type-label" {...textStyling}>
                            GEMS DIAMETER
                        </Text>
                        <Box width={['100%']} mr={[4]}>
                            <Select
                                options={extractTextArea(gems.gemTypes)}
                                handleChange={a}
                                placeholder="select gems diameter"
                                aria-labelledby="gem-type-label"
                            />
                        </Box>
                    </Flex>
                </>
            ) : null}

            {/* size form */}
            <Flex
                className="size"
                {...containerStyling}
                sx={{ a: { textDecoration: 'none' } }}
            >
                <Text id="size-label" {...textStyling}>
                    SIZES
                </Text>
                <Box width={['100%']} mr={[4]} mb={[2]}>
                    <Select
                        options={sizes}
                        handleChange={a}
                        placeholder="select size"
                        aria-labelledby="size-label"
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
                <Box width={['100%']} mr={[4]}>
                    <Select
                        options={quantities}
                        handleChange={a}
                        placeholder="select quantity"
                        aria-labelledby="quantity-label"
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export { ProductForm };
