import React from 'react';

import { Flex } from 'rebass';

import { Facebook, Pinterest, Instagram } from './assets';

type Props = {};

const Social: React.FC<Props> = () => {
    const INSTAGRAM = 'localhost:9001';
    const FACEBOOK = 'localhost:9001';
    const PINTEREST = 'localhost:9001';

    return (
        <Flex
            my={[4]}
            sx={{
                '& a': {
                    mx: [4, 6],
                    svg: {
                        height: [18, 24],
                        width: [18, 24],
                    },
                },
            }}
        >
            <a href={INSTAGRAM}>
                <Instagram />
            </a>
            <a href={FACEBOOK}>
                <Facebook />
            </a>
            <a href={PINTEREST}>
                <Pinterest />
            </a>
        </Flex>
    );
};

export { Social };
