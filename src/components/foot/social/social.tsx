import React from 'react';

import { Flex } from 'rebass';

import { Facebook, Pinterest, Instagram } from './assets';

type Props = {};

const Social: React.FC<Props> = () => {
    const INSTAGRAM = 'https://www.instagram.com/etheralmade/';
    const FACEBOOK = 'https://www.facebook.com/etheralmade';
    const PINTEREST = 'https://pin.it/NrIwTvY';

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
            <a href={INSTAGRAM} target="_blank">
                <Instagram />
            </a>
            <a href={FACEBOOK} target="_blank">
                <Facebook />
            </a>
            <a href={PINTEREST} target="_blank">
                <Pinterest />
            </a>
        </Flex>
    );
};

export { Social };
