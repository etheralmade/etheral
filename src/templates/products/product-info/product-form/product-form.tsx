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
            <Flex>
                <Text>SIZES</Text>
                <Select options={sizes} handleClick={a} />
            </Flex>
        </Box>
    );
};

export { ProductForm };
