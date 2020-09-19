import React from 'react';

import { Box } from 'rebass';

import NotionExport from './notion-export';

type Props = {};

const Links: React.FC<Props> = () => {
    return (
        <Box
            height="100vh"
            maxHeight="100vh"
            pb={[5]}
            className="custom-scrollbar"
        >
            <NotionExport />
        </Box>
    );
};

export { Links };
