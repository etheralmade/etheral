import React from 'react';
import { capitalize } from 'lodash';

import { Box as ReBox, Heading, Text } from 'rebass';
// import { LatestProducts, LatestBlogs, LatestCollections } from '..';

import Box from './box';

export enum Type {
    PRODUCT = 'products',
    COLLECTION = 'collections',
    BLOG = 'blogs',
    DISCOUNT = 'discounts',
}

type Props = {
    type: Type;
    item: any;
    removeDiscountCode?: (code: string) => Promise<void>;
    showSureModal?: () => void;
};

const timestampAttrs = ['Status', 'Created', 'Updated'];
const productAttrs = ['Name', ...timestampAttrs];
const collectionAttrs = productAttrs;
const blogAttrs = ['Slug', ...timestampAttrs, ''];
const discountAttrs = ['Code', 'Value', 'Expires In', ''];

const ContainerBox: React.FC<Props> = ({
    type,
    item,
    showSureModal,
    removeDiscountCode,
}) => {
    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [1],
        color: '#555',
    };

    const boxStyling = {
        p: 4,
        bg: '#fff',
        width: ['100%', '100%', '100%', '48%'],
        css: `
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
            position: relative;
		`,
    };

    const renderAttrs =
        type === Type.PRODUCT
            ? productAttrs
            : type === Type.COLLECTION
            ? collectionAttrs
            : type === Type.BLOG
            ? blogAttrs
            : discountAttrs;

    return (
        <ReBox {...boxStyling} my={[5]}>
            <Heading as="h2" color="#333" fontSize={[3]} mb={[3]}>
                {capitalize(type)}
            </Heading>

            {showSureModal && (
                <ReBox
                    sx={{
                        fontFamily: 'body',
                        position: 'absolute',
                        right: 4,
                        top: 4,
                        p: [2],
                        fontSize: [1],
                        color: '#555',
                        transition: '0.2s',
                        bg: 'white.2',
                        '&:hover': { cursor: 'pointer', bg: 'white.3' },
                    }}
                    onClick={showSureModal}
                >
                    Add discount code
                </ReBox>
            )}

            {/* Render grid table based on type attributes. */}
            <ReBox
                sx={{
                    display: 'grid',
                    gridGap: 2,
                    gridTemplateColumns: `repeat(${
                        renderAttrs.length
                    }, minmax(${256 / renderAttrs.length}px, 1fr))`,
                }}
            >
                {renderAttrs.map(attr => (
                    <Text key={`${type}-${attr}`} {...tabletopStyling}>
                        {attr}
                    </Text>
                ))}
                <ReBox
                    sx={{
                        gridColumn: `1/span${renderAttrs.length}`,
                    }}
                >
                    {item.map((itemEl: any, i: number) => (
                        <Box
                            item={itemEl}
                            key={`${type}-${i}`}
                            type={type}
                            bg={i % 2 === 0 ? 'white.2' : 'white.3'}
                            removeDiscountCode={removeDiscountCode}
                        />
                    ))}
                </ReBox>
            </ReBox>
        </ReBox>
    );
};

export { ContainerBox };
