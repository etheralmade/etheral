import React from 'react';

import { Box, Text } from 'rebass';
import { InlineIcon } from '@iconify/react';
import deleteBinFill from '@iconify/icons-ri/delete-bin-fill';

type Props = {
    onClick: any;
};

const DeteleButton: React.FC<Props> = ({ onClick }) => {
    const textStyling = {
        fontFamily: 'body',
        fontSize: [1],
        // color: 'black.0' => removed to be able to apply custom color on remove text,
        fontWeight: 'medium',
        css: `
			 white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		`,
    };

    return (
        <Box width="100%">
            <Text
                {...textStyling}
                p={[1]}
                width="fit-content"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'misc.discount',
                    bg: 'transparent',
                    transition: '0.2s',
                    svg: {
                        mr: 2,
                        path: {
                            fill: 'misc.discount',
                            transition: '0.2s',
                        },
                    },
                    '&:hover': {
                        cursor: 'pointer',
                        bg: 'misc.discount',
                        color: '#fff',
                        'svg path': { fill: '#fff' },
                    },
                }}
                onClick={onClick}
                role="button"
            >
                <InlineIcon icon={deleteBinFill} />
                Remove
            </Text>
        </Box>
    );
};

export default DeteleButton;
