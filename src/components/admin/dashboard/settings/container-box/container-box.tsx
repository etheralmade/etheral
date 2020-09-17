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
    boxStyling: any;
    type: Type;
    item: any;
};

const timestampAttrs = ['Status', 'Created', 'Updated'];
const productAttrs = ['Name', ...timestampAttrs];
const collectionAttrs = productAttrs;
const blogAttrs = ['Slug', ...timestampAttrs];

const ContainerBox: React.FC<Props> = ({ boxStyling, type, item }) => {
    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        color: '#555',
    };

    const renderAttrs =
        type === Type.PRODUCT
            ? productAttrs
            : type === Type.COLLECTION
            ? collectionAttrs
            : blogAttrs;

    const handleClick = (a: string) => {
        console.log(a);
    };

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
                        gridColumn: '1/span 4',
                    }}
                >
                    {item.map((itemEl: any, i: number) => (
                        <Box
                            item={itemEl}
                            key={`${type}-${i}`}
                            type={type}
                            handleClick={handleClick}
                            bg={i % 2 === 0 ? 'white.2' : 'white.3'}
                        />
                    ))}
                </ReBox>
            </ReBox>
        </ReBox>
    );
};

export { ContainerBox };
