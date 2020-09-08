import React from 'react';

import { Flex } from 'rebass';

import Links from './links';
import MailingList from './mailing-list';

type Props = {};

const Footer: React.FC<Props> = () => {
    return (
        <Flex>
            <Links />
            <MailingList />
        </Flex>
    );
};

export { Footer };
