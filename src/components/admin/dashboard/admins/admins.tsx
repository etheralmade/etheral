import React from 'react';

import { Box, Heading, Text } from 'rebass';

type Props = {
    db: firebase.firestore.Firestore;
};

const Admins: React.FC<Props> = ({ db }) => {
    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        color: '#555',
    };

    return (
        <Box bg="#fff" width={['60%']} p={[4]}>
            <Heading>Admins</Heading>
            <Box
                sx={{
                    display: 'grid',
                    gridGap: 2,
                    gridTemplateColumns:
                        'repeat(3, minmax(calc(256px / 3), 1fr))',
                }}
            >
                <Text {...tabletopStyling}>Email</Text>
                <Text {...tabletopStyling}>Invited by</Text>
            </Box>
        </Box>
    );
};

export { Admins };
