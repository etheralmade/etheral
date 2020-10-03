import React from 'react';

import { Box, Text } from 'rebass';
import { InlineIcon } from '@iconify/react';
import deleteBinFill from '@iconify/icons-ri/delete-bin-fill';

import { Admin } from 'helper/schema';

type Props = Admin & {
    bg: string;
    adminEmail: string;
    removeAdmin: () => void;
};

const AdminBox: React.FC<Props> = ({
    bg,
    email,
    invitedBy,
    removeAdmin,
    adminEmail,
}) => {
    const textStyling = {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        // color: 'black.0' => removed to be able to apply custom color on remove text,
        fontWeight: 'medium',
        css: `
			 white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		`,
    };

    return (
        <Box
            bg={bg}
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(calc(256px / 3), 1fr))',
                gridGap: 2,
            }}
            p={[2]}
        >
            <Text {...textStyling} color="black.0">
                {email}
            </Text>
            <Text {...textStyling} color="black.0">
                {invitedBy}
            </Text>
            {invitedBy !== 'root' || adminEmail !== email ? (
                <Box>
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
                        onClick={removeAdmin}
                        role="button"
                    >
                        <InlineIcon icon={deleteBinFill} />
                        Remove
                    </Text>
                </Box>
            ) : null}
        </Box>
    );
};

export { AdminBox };
