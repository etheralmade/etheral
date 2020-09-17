import React from 'react';

import { Flex, Button } from 'rebass';

import { theme } from 'styles';
import ContainerBox, { Type } from './container-box';
import { LatestProducts, LatestBlogs, LatestCollections } from '.';

type Props = {
    db: firebase.firestore.Firestore;
    latestProducts: LatestProducts[];
    latestBlogs: LatestBlogs[];
    latestCollections: LatestCollections[];
    fromDate: (date: Date) => firebase.firestore.Timestamp;
};

const Settings: React.FC<Props> = ({
    db,
    latestProducts,
    latestBlogs,
    latestCollections,
    fromDate,
}) => {
    // const [onFocus, setOnFocus] = useState<Product | Collection | null>(null);

    const updateWebsite = async () => {
        try {
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
        } catch (err) {
            console.error(err);
        }
    };

    console.log(process.env.GATSBY_NETLIFY_BUILD_HOOK);

    return (
        <Flex
            height="90vh"
            pb={[5]}
            flexDirection="column"
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
                <Button onClick={updateWebsite} ml={[4]}>
                    Update Website
                </Button>
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between">
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
            </Flex>
        </Flex>
    );
};

export { Settings };
