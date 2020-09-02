import React, { useState } from 'react';
import { Flex, Box } from 'rebass';

type Props = {
    logout: () => void;
};

export enum StateViews {
    ORDERS,
    ADMINS,
    LINKS,
    NONE,
}

const Dashboard: React.FC<Props> = ({ logout }) => {
    const [view, setView] = useState<StateViews>(StateViews.NONE);

    const changeView = (viewName: StateViews) => {
        setView(viewName);
    };

    return (
        <Flex data-testid="dashboard">
            <Box></Box>
            <Box></Box>
        </Flex>
    );
};

export { Dashboard };
