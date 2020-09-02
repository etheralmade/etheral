import React from 'react';
import { Flex, Box } from 'rebass';

type Props = {};

const Dashboard: React.FC<Props> = () => {
    return (
        <Flex data-testid="dashboard">
            <Box></Box>
            <Box></Box>
        </Flex>
    );
};

export { Dashboard };
