import React from 'react';
import { capitalize } from 'lodash';

import { Box as ReBox, Heading, Text } from 'rebass';
// import { LatestProducts, LatestBlogs, LatestCollections } from '..';

import Box from './box';

export enum Type {
    PRODUCT = 'products',
    COLLECTION = 'collections',
    BLOG = 'blogs',
}

type Props = {
    type: Type;
    item: any;
};

const timestampAttrs = ['Status', 'Created', 'Updated'];
const productAttrs = ['Name', ...timestampAttrs];
const collectionAttrs = productAttrs;
const blogAttrs = ['Slug', ...timestampAttrs, ''];

const ContainerBox: React.FC<Props> = ({ type, item }) => {
    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        color: '#555',
    };

    const boxStyling = {
        p: 4,
        bg: '#fff',
        width: ['100%', '100%', '100%', '48%'],
        css: `
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
		`,
    };

    const renderAttrs =
        type === Type.PRODUCT
            ? productAttrs
            : type === Type.COLLECTION
            ? collectionAttrs
            : blogAttrs;

    return (
        <ReBox {...boxStyling} my={[5]}>
            <Heading
                as="h1"
                fontWeight={200}
                color="#333"
                fontSize={[3]}
                mb={[3]}
            >
                {capitalize(type)}
            </Heading>

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
                        />
                    ))}
                </ReBox>
            </ReBox>
        </ReBox>
    );
};

export { ContainerBox };
