import React from 'react';

import { Flex, Text } from 'rebass';

import Links from './links';
import MailingList from './mailing-list';
import Social from './social';

// outer wrapper has to be styled externally as if css props is passed it would overwrite the initial variant styling
import './footer.scss';

type Props = {};

const Footer: React.FC<Props> = () => {
    return (
        <Flex variant="outerWrapper" as="footer" bg="#fff" my={[0]}>
            <Flex
                variant="innerWrapper"
                py={[5]}
                pb={[8]}
                px={[8, 8, 7]}
                flexDirection="column"
                alignItems="center"
            >
                <MailingList />
                <Links />
                <Social />
                <Text
                    className="copyright"
                    fontFamily="body"
                    width="100vw"
                    textAlign="center"
                    fontSize={[0, 0, 1]}
                    role="contentinfo"
                >
                    Copyright
                </Text>
            </Flex>
        </Flex>
    );
};

export { Footer };
