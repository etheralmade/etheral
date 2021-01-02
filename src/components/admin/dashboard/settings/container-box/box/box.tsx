import React, { useState } from 'react';

import { Box as ReBox, Text, Flex, Button } from 'rebass';

import { Blog as BlogSchema } from 'helper/schema';

import DeleteButton from 'components/admin/dashboard/delete-button';
import Modal from 'components/modal';
import { Blog } from 'templates/blogs/blog';
import { Layout } from 'components/layout';

import { Type } from '..';
import StatusBadge, { BadgeTypes } from '../../../orders/status-badge';
import { getDateReadable } from 'helper/get-date';
import { Status } from '../..';

type Props = {
    item: any;
    type: Type;
    bg: string;
    removeDiscountCode?: (code: string) => Promise<void>;
};

const Box: React.FC<Props> = ({ item, type, bg, removeDiscountCode }) => {
    const [isPreviewingBlog, setIsPreviewingBlog] = useState(false);

    /**
     * Function to open preview modal for blogs
     */
    const previewBlog = () => {
        setIsPreviewingBlog(true);
    };

    const textStyling = {
        fontFamily: 'body',
        fontSize: [1],
        color: 'black.0',
        fontWeight: 'bold',
        css: `
			 white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		`,
    };

    if (type === Type.PRODUCT || type === Type.COLLECTION) {
        return (
            <ReBox
                bg={bg}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(64px, 1fr))',
                    gridGap: 2,
                    transition: '0.2s',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                px={[2]}
                py={[2]}
            >
                <Text sx={{ gridColumn: '1/2' }} {...textStyling}>
                    {item.name}
                </Text>
                <Flex flexWrap="wrap" sx={{ gridColumn: '2/3' }}>
                    <StatusBadge
                        type={BadgeTypes.SETTINGS}
                        update={item.status === Status.UPDATE}
                    />
                </Flex>
                <Text sx={{ gridColumn: '3/4' }} {...textStyling}>
                    {getDateReadable(item.createdDate)}
                </Text>
                <Text sx={{ gridColumn: '4/5' }} {...textStyling}>
                    {item.lastModifiedDate
                        ? getDateReadable(item.lastModifiedDate)
                        : '-'}
                </Text>
            </ReBox>
        );
    } else if (type === Type.BLOG) {
        return (
            <ReBox
                bg={bg}
                sx={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(5, minmax(calc(256px / 5), 1fr))',
                    gridGap: 2,
                    transition: '0.2s',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                px={[2]}
                py={[2]}
            >
                {isPreviewingBlog && (
                    <Modal absolute={true}>
                        <Layout isShowingBlog={true}>
                            <ReBox width="100vw">
                                <Blog
                                    blog={item as BlogSchema}
                                    isPreviewing={true}
                                />
                            </ReBox>
                        </Layout>
                        <Button
                            sx={{
                                position: 'fixed',
                                bottom: 32,
                                right: 32,
                                zIndex: 1111,
                            }}
                            onClick={() => {
                                setIsPreviewingBlog(false);
                            }}
                        >
                            Close preview
                        </Button>
                    </Modal>
                )}
                <Text sx={{ gridColumn: '1/2' }} {...textStyling}>
                    {item.slug}
                </Text>
                <Flex flexWrap="wrap" sx={{ gridColumn: '2/3' }}>
                    <StatusBadge
                        type={BadgeTypes.SETTINGS}
                        update={item.status === Status.UPDATE}
                    />
                </Flex>
                <Text sx={{ gridColumn: '3/4' }} {...textStyling}>
                    {getDateReadable(item.createdDate)}
                </Text>
                <Text sx={{ gridColumn: '4/5' }} {...textStyling}>
                    {item.lastModifiedDate
                        ? getDateReadable(item.lastModifiedDate)
                        : '-'}
                </Text>
                <Button
                    bg="badges.0"
                    onClick={previewBlog}
                    sx={{ borderRadius: [4] }}
                >
                    Preview
                </Button>
            </ReBox>
        );
    } else if (type === Type.DISCOUNT && removeDiscountCode) {
        return (
            <ReBox
                bg={bg}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(64px, 1fr))',
                    gridGap: 2,
                    transition: '0.2s',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
                px={[2]}
                py={[2]}
            >
                <Text sx={{ gridColumn: '1/2' }} {...textStyling}>
                    {item.code}
                </Text>
                <Text sx={{ gridColumn: '2/3' }} {...textStyling}>
                    {item.value} %
                </Text>
                <Text sx={{ gridColumn: '3/4' }} {...textStyling}>
                    {getDateReadable(item.expiresIn)}
                </Text>
                <DeleteButton
                    onClick={() => {
                        removeDiscountCode(item.code);
                    }}
                />
            </ReBox>
        );
    } else {
        return null;
    }
};

export { Box };
