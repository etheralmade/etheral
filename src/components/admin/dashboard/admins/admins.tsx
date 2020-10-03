import React, { useEffect, useState } from 'react';

import { Box, Heading, Text, Flex } from 'rebass';
import { Icon } from '@iconify/react';
import addFill from '@iconify/icons-ri/add-fill';

import AdminBox from './admin-box';
import { Admin } from 'helper/schema';

type Props = {
    db: firebase.firestore.Firestore;
};

const DEFAULT_ADMIN_PASSWORD = '123456';

const Admins: React.FC<Props> = ({ db }) => {
    // state to store admin member(s) from db.
    const [allAdmins, setAllAdmins] = useState<Admin[]>([]);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        // fetch all admin members
        fetchAdmin();
    }, []);

    /**
     * Function to add admin user to the db.
     * !! set default password to be => 123456.
     * calls cloud function to notify the invited admin user (to email addr.)
     */
    const addAdmin = async (email: string) => {};

    /**
     * Function to remove admin user to the db.
     */
    const removeAdmin = async (email: string) => {
        console.log(`removing ${email}`);
    };

    const fetchAdmin = async () => {
        const req = await db.collection('admin-user').get();

        // WHAT? u can map firestore docs???????? 😲
        const docs = await req.docs.map(snapshot => snapshot.data());

        await setAllAdmins(docs as Admin[]);
    };

    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [1],
        color: '#555',
    };

    return (
        <Box bg="#fff" width={['100%', '100%', '60%']} p={[4]}>
            <Flex alignItems="center" justifyContent="space-between" mb={[3]}>
                <Heading>Admins</Heading>
                <Flex
                    variant="center"
                    p={[3]}
                    sx={{
                        transition: '0.2s',
                        bg: 'white.2',
                        '&:hover': { cursor: 'pointer', bg: 'white.3' },
                    }}
                >
                    <Icon icon={addFill} />
                    <Text {...tabletopStyling} fontWeight="bold" ml={[2]}>
                        Add admin
                    </Text>
                </Flex>
            </Flex>
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

                {/* render all admin member(s) here */}
                <Box sx={{ gridColumn: '1/span 3', gridRow: '2 / auto' }}>
                    {allAdmins.map((admin, i) => (
                        <AdminBox
                            key={`${admin.email}-list`}
                            bg={i % 2 === 0 ? 'white.2' : 'white.3'}
                            removeAdmin={() => {
                                removeAdmin(admin.email);
                            }}
                            {...admin}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export { Admins };
