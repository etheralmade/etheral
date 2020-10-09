import React from 'react';

import { Box, Text } from 'rebass';

import { Admin } from 'helper/schema';
import DeleteButton from 'components/admin/dashboard/delete-button';

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
            {invitedBy.toLowerCase() !== 'root' && adminEmail !== email ? (
                <DeleteButton onClick={removeAdmin} />
            ) : null}
        </Box>
    );
};

export { AdminBox };
