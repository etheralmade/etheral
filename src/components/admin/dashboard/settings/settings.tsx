import React from 'react';

import { Box, Flex, Button } from 'rebass';

import { theme } from 'styles';
import ContainerBox, { Type } from './container-box';
import { LatestProducts, LatestBlogs, LatestCollections } from '.';

type Props = {
    latestProducts: LatestProducts[];
    latestBlogs: LatestBlogs[];
    latestCollections: LatestCollections[];
};

const Settings: React.FC<Props> = ({
    latestProducts,
    latestBlogs,
    latestCollections,
}) => {
    // const [onFocus, setOnFocus] = useState<Product | Collection | null>(null);

    const boxStyling = {
        p: 4,
        bg: '#fff',
        width: '100%',
        css: `
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
		`,
    };

    return (
        <Flex
            height="90vh"
            pb={[5]}
            justifyContent="space-evenly"
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
            <Box width={['48%']}>
                <Button ml={'auto'} sx={{ float: 'right' }}>
                    Update Website
                </Button>
                <Box mt={[8]}>
                    {/* render updated products. */}
                    {latestProducts.length > 0 && (
                        <ContainerBox
                            boxStyling={boxStyling}
                            type={Type.PRODUCT}
                            item={latestProducts}
                        />
                    )}

                    {/* render updated collections */}
                    {latestCollections.length > 0 && (
                        <ContainerBox
                            boxStyling={boxStyling}
                            type={Type.COLLECTION}
                            item={latestCollections}
                        />
                    )}

                    {/* render updated blogs */}
                    {latestBlogs.length > 0 && (
                        <ContainerBox
                            boxStyling={boxStyling}
                            type={Type.BLOG}
                            item={latestBlogs}
                        />
                    )}
                </Box>
            </Box>
            {/* box to show Order. */}
            <Box
                {...boxStyling}
                width={['48%']}
                css={`
                    @media screen and (max-width: 48em) {
                        position: absolute;
                        padding: 0;
                    }
                `}
            >
                {/* {onFocus && (
                    <OrderItem order={onFocus} db={db} goBack={goBack} />
                )} */}
            </Box>
        </Flex>
    );
};

export { Settings };
