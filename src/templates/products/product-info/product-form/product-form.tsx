import React from 'react';

import { Box, Flex, Text } from 'rebass';

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

const ProductForm: React.FC<Props> = ({ availableSizes }) => {
    const sizes = extractTextArea(availableSizes);

    const a = () => {
        console.log('chane');
    };

    return (
        <Box>
            {/* size form */}
            <Flex className="size" alignItems="center" flexWrap="wrap">
                <Text
                    id="size-label"
                    variant="productName"
                    mr={[0, 4]}
                    mb={[4]}
                    width={['100%']}
                >
                    SIZES
                </Text>
                <Box width={[200]} mr={[4]}>
                    <Select
                        options={sizes}
                        handleChange={a}
                        placeholder="select size"
                        aria-labelledby="size-label"
                    />
                </Box>
                <Text variant="productPrice">SIZE GUIDE</Text>
            </Flex>
        </Box>
    );
};

export { ProductForm };
