import React, { useState, useEffect } from 'react';

import { Flex, Button, Text } from 'rebass';

import ContainerBox, { Type } from './container-box';
import {
    LatestProducts,
    LatestBlogs,
    LatestCollections,
    DiscountCodes,
} from '.';
import Modal from 'components/modal';
import SurePopupSettings from 'components/popups/sure-popup-settings';

type Props = {
    db: firebase.firestore.Firestore;
    latestProducts: LatestProducts[];
    latestBlogs: LatestBlogs[];
    latestCollections: LatestCollections[];
    latestCodes: DiscountCodes[];
    fromDate: (date: Date) => firebase.firestore.Timestamp;
    doRerender: () => void;
};

// choice to update website
export enum DoUpdate {
    YES = 'update',
    NO = 'do_not_update',
}

enum ComponentState {
    NONE,
    SURE_DISCOUNT,
    SURE_UPDATE,
}

const Settings: React.FC<Props> = ({
    db,
    latestProducts,
    latestBlogs,
    latestCollections,
    latestCodes,
    fromDate,
    doRerender,
}) => {
    // state to show a popup asking about the choice to update the website.
    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState<ComponentState>(ComponentState.NONE);

    const [doUpdateWebsite, setDoUpdateWebsite] = useState<
        DoUpdate | undefined
    >(undefined);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
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

            await doRerender();
        } catch (err) {
            console.error(err);
        }
    };

    const initUpdateWebsite = () => {
        setShowModal(true);
    };

    // function to remove discount code from db
    const removeDiscountCode = async (code: string) => {
        try {
            await db
                .collection('discount')
                .doc(code)
                .delete();

            await doRerender();
        } catch (e) {
            console.error(e);
        }
    };

    // function to add discount code to db.
    const addDiscountCode = async (
        code: string,
        value: number,
        expiresIn: Date
    ) => {
        try {
            await db
                .collection('discount')
                .doc(code)
                .set({
                    value,
                    expiresIn: fromDate(expiresIn),
                });

            await doRerender();
        } catch (e) {
            console.error(e);
        }
    };

    // switch statement to render modal
    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let modal;

    switch (state) {
        case ComponentState.SURE_UPDATE:
            modal = (
                <SurePopupSettings
                    yes={() => setDoUpdateWebsite(DoUpdate.YES)}
                    no={() => setDoUpdateWebsite(DoUpdate.NO)}
                    close={() => setShowModal(false)}
                />
            );
            break;
        case ComponentState.SURE_DISCOUNT:
            modal = <h1>Hello world!</h1>;
            break;
        default:
            modal = (
                <Text variant="tileText" color="black.0">
                    UPDATING...
                </Text>
            );
            break;
    }

    return (
        <Flex
            height="90vh"
            pb={[5]}
            flexDirection="column"
            className="custom-scrollbar"
        >
            {showModal && <Modal center={true}>{modal}</Modal>}
            <Flex
                flexDirection={['column', 'column', 'row']}
                alignSelf={['flex-start', 'flex-start', 'flex-end']}
                mb={[0, 0, 6]}
                flexWrap="wrap"
            >
                <a
                    href="https://app.flamelink.io/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button
                        id="cms-link"
                        variant="secondary"
                        mb={[2, 2, 2, 0]}
                        mr={[0, 0, 2, 4]}
                    >
                        <span
                            role="img"
                            aria-labelledby="cms-link"
                            style={{ marginRight: 4 }}
                        >
                            ✍
                        </span>{' '}
                        Content Management System
                    </Button>
                </a>
                <Button onClick={initUpdateWebsite} mb={[2, 2, 2, 0]}>
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

                <ContainerBox
                    type={Type.DISCOUNT}
                    item={latestCodes}
                    removeDiscountCode={removeDiscountCode}
                    showSureModal={() => {
                        setShowModal(true);
                        setState(ComponentState.SURE_DISCOUNT);
                    }}
                />

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
