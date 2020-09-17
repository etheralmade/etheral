import React from 'react';

import { Box } from 'rebass';

import NotionExport from './notion-export';
import { theme } from 'styles';

type Props = {};

const Links: React.FC<Props> = () => {
    return (
        <Box
            height="100vh"
            maxHeight="100vh"
            pb={[5]}
            css={`
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    width: 6px;
                }

                /* Track */
                &::-webkit-scrollbar-track {
                }

                /* Handle */
                &::-webkit-scrollbar-thumb {
                    background: ${theme.colors.black[0]};
                }
            `}
        >
            <NotionExport />
        </Box>
    );
};

export { Links };
