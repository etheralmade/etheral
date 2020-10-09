import React from 'react';

import { Box } from 'rebass';

import NotionExport from './notion-export';

type Props = {};

const Links: React.FC<Props> = () => {
    return (
        <Box
            height={['90vh', '90vh', '100vh']}
            pb={[5]}
            className="custom-scrollbar"
            sx={{ overflowX: 'hidden' }}
        >
            <NotionExport />
        </Box>
    );
};

export { Links };
