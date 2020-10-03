import React, { useEffect, useState } from 'react';
import { sha256 } from 'js-sha256';
import axios from 'axios';

import { Box, Heading, Text, Flex } from 'rebass';
import { Icon } from '@iconify/react';
import addFill from '@iconify/icons-ri/add-fill';

import AdminBox from './admin-box';
import { Admin } from 'helper/schema';
import Modal from 'components/modal';
import AddAdminModal from './add-admin-modal';
import RemoveAdminModal from './remove-admin-modal';

type Props = {
    db: firebase.firestore.Firestore;
    adminEmail: string;
};

enum State {
    DEFAULT,
    ASK_REMOVE,
    ADDING,
    REMOVING,
    ERROR,
    ADDED,
    REMOVED,
}

const DEFAULT_ADMIN_PASSWORD = '123456';

const Admins: React.FC<Props> = ({ db, adminEmail }) => {
    // state to store admin member(s) from db.
    const [allAdmins, setAllAdmins] = useState<Admin[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [compState, setCompState] = useState<State>(State.DEFAULT);

    // temporary state to store to be removed email
    const [toRemoveAdmin, setToRemoveAdmin] = useState('');

    const url = process.env.NODE_ENV === 'production' ? '' : '/send-email/';

    const webUrl =
        process.env.NODE_ENV === 'production'
            ? ''
            : 'http://localhost:8000/admin';

    useEffect(() => {
        // fetch all admin members
        fetchAdmin();
    }, []);

    useEffect(() => {
        if (
            compState === State.ADDED ||
            compState === State.ERROR ||
            compState === State.REMOVED
        ) {
            setTimeout(() => {
                setCompState(State.DEFAULT);
            }, 2000);
        }
    }, [compState]);

    /**
     * Function to add admin user to the db.
     * !! set default password to be => 123456.
     * calls cloud function to notify the invited admin user (to email addr.)
     */
    const addAdmin = async (email: string) => {
        // console.log(`adding ${email}`);
        if (showModal) {
            await setShowModal(false);
        }

        await setCompState(State.ADDING);

        try {
            const doc = await {
                email,
                password: sha256(DEFAULT_ADMIN_PASSWORD),
                invitedBy: adminEmail,
            };

            // add data to db
            await db.collection('admin-user').add(doc);

            // set state to added.
            await setCompState(State.ADDED);

            await fetchAdmin();

            // send email to the added admin.
            sendNotifAdd(email);
            // refetch admins.
        } catch (e) {
            console.error(e);
            setCompState(State.ERROR);
        }
    };

    /**
     * Function to remove admin user to the db.
     */
    const removeAdmin = async (email: string) => {
        if (showModal) {
            setShowModal(false);
        }

        if (toRemoveAdmin) {
            try {
                await setCompState(State.REMOVING);

                const req = await db
                    .collection('admin-user')
                    .where('email', '==', email)
                    .get();

                if (await !req.empty) {
                    await req.docs.forEach(snapshot => {
                        snapshot.ref.delete();
                    });

                    await setCompState(State.REMOVED);
                } else {
                    setCompState(State.ERROR);
                }

                await fetchAdmin();

                // send email notification
                sendNotifRemove(toRemoveAdmin);
                // refetch admins.
            } catch (e) {
                console.error(e);
                setCompState(State.ERROR);
            }
        }
    };

    const fetchAdmin = async () => {
        const req = await db.collection('admin-user').get();

        // WHAT? u can map firestore docs???????? 😲
        const docs = await req.docs.map(snapshot => snapshot.data());

        await setAllAdmins(docs as Admin[]);
    };

    // send email to the added admin
    const sendNotifAdd = (email: string) => {
        const body = {
            invitedBy: adminEmail,
            webUrl,
            to: email,
        };

        axios.post(`${url}?type=ADD_ADMIN`, body);
    };

    // send email to the removed admin email
    const sendNotifRemove = (email: string) => {
        axios.post(`${url}?type=REMOVE_ADMIN`, { to: email });
    };

    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [1],
        color: '#555',
    };

    const stateText =
        compState === State.ADDING
            ? 'ADDING ADMIN USER...'
            : compState === State.ADDED
            ? 'NEW ADMIN USER SUCCESSFULLY ADDED!'
            : compState === State.REMOVING
            ? `REMOVING ${toRemoveAdmin}...`
            : compState === State.REMOVED
            ? `SUCCESFULLY REMOVED ${toRemoveAdmin} FROM ADMIN DATABASE`
            : 'OH NO! SOMETHING WENT WRONG';

    return (
        <Box bg="#fff" width={['100%', '100%', '60%']} p={[4]}>
            {/* show modal => ask for confirmation to add and/or remove admin user(s) */}
            {showModal && (
                <Modal center={true}>
                    {compState === State.ASK_REMOVE ? (
                        <RemoveAdminModal
                            toRemoveAdmin={toRemoveAdmin}
                            yes={() => {
                                removeAdmin(toRemoveAdmin);
                            }}
                            no={() => {
                                setCompState(State.DEFAULT);
                                setToRemoveAdmin('');
                            }}
                        />
                    ) : (
                        <AddAdminModal
                            yes={addAdmin}
                            no={() => {
                                setShowModal(false);
                            }}
                        />
                    )}
                </Modal>
            )}

            {/* show component state (e.g adding, removing.) */}
            {!showModal && compState !== State.DEFAULT ? (
                <Modal center={true}>
                    <Heading
                        fontSize={5}
                        fontWeight="body"
                        bg="black.0"
                        color="#fff"
                    >
                        {stateText}
                    </Heading>
                </Modal>
            ) : null}

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
                    onClick={() => setShowModal(true)}
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
                                setShowModal(true);
                                setCompState(State.ASK_REMOVE);
                                setToRemoveAdmin(admin.email);
                            }}
                            adminEmail={adminEmail}
                            {...admin}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export { Admins };
