import React, { useState, useEffect } from 'react';

import { Flex, Button, Text } from 'rebass';

import ContainerBox, { Type } from './container-box';
import { LatestProducts, LatestBlogs, LatestCollections } from '.';
import Modal from 'components/modal';
import SurePopupSettings from 'components/popups/sure-popup-settings';

type Props = {
    db: firebase.firestore.Firestore;
    latestProducts: LatestProducts[];
    latestBlogs: LatestBlogs[];
    latestCollections: LatestCollections[];
    fromDate: (date: Date) => firebase.firestore.Timestamp;
};

// choice to update website
export enum DoUpdate {
    YES = 'update',
    NO = 'do_not_update',
}

const Settings: React.FC<Props> = ({
    db,
    latestProducts,
    latestBlogs,
    latestCollections,
    fromDate,
}) => {
    // state to show a popup asking about the choice to update the website.
    const [showModal, setShowModal] = useState(false);
    const [doUpdateWebsite, setDoUpdateWebsite] = useState<
        DoUpdate | undefined
    >(undefined);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        console.log(doUpdateWebsite);
        // fetch build hook if admin decide to update it.
        if (doUpdateWebsite !== undefined) {
            if (doUpdateWebsite === DoUpdate.YES) {
                updateWebsite();
            } else {
                setShowModal(false);
                setDoUpdateWebsite(undefined);
            }
        }
    }, [doUpdateWebsite]);

    const updateWebsite = async () => {
        try {
            await setIsUpdating(true);
            const req = await fetch(
                process.env.GATSBY_NETLIFY_BUILD_HOOK || '',
                {
                    method: 'POST',
                }
            );

            const { status } = await req;

            if ((await status) === 200) {
                const nowDate = new Date();

                await db
                    .collection('website-update')
                    .doc(nowDate.getTime().toString())
                    .set({ lastUpdate: fromDate(nowDate) });
            }

            await setIsUpdating(false);
            await setShowModal(false);
            await setDoUpdateWebsite(undefined);
        } catch (err) {
            console.error(err);
        }
    };

    const initUpdateWebsite = () => {
        setShowModal(true);
    };

    return (
        <Flex
            height="90vh"
            pb={[5]}
            flexDirection="column"
            className="custom-scrollbar"
        >
            {showModal && (
                <Modal center={true}>
                    {!isUpdating ? (
                        <SurePopupSettings
                            yes={() => setDoUpdateWebsite(DoUpdate.YES)}
                            no={() => setDoUpdateWebsite(DoUpdate.NO)}
                            close={() => setShowModal(false)}
                        />
                    ) : (
                        <Text variant="tileText" color="black.0">
                            UPDATING...
                        </Text>
                    )}
                </Modal>
            )}
            <Flex alignSelf="flex-end" mb={[6]}>
                <a
                    href="https://app.flamelink.io/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button id="cms-link" variant="secondary">
                        <span role="img" aria-labelledby="cms-link">
                            ✍
                        </span>{' '}
                        Content Management System
                    </Button>
                </a>
                <Button onClick={initUpdateWebsite} ml={[4]}>
                    Update Website
                </Button>
            </Flex>
            <Flex
                flexWrap="wrap"
                justifyContent="space-between"
                sx={{ position: 'relative' }}
            >
                {/* render updated products. */}
                {latestProducts.length > 0 && (
                    <ContainerBox type={Type.PRODUCT} item={latestProducts} />
                )}

                {/* render updated collections */}
                {latestCollections.length > 0 && (
                    <ContainerBox
                        type={Type.COLLECTION}
                        item={latestCollections}
                    />
                )}

                {/* render updated blogs */}
                {latestBlogs.length > 0 && (
                    <ContainerBox type={Type.BLOG} item={latestBlogs} />
                )}
                {latestProducts.length === 0 &&
                latestCollections.length === 0 &&
                latestBlogs.length === 0 ? (
                    <Text
                        variant="tileText"
                        color="black.0"
                        sx={{
                            position: 'absolute',
                            top: '50vh',
                            left: '50%',
                            transform: 'translate(-50%, -25vh)',
                        }}
                    >
                        WEBSITE IS UP TO DATE
                    </Text>
                ) : (
                    <></>
                )}
            </Flex>
        </Flex>
    );
};

export { Settings };
