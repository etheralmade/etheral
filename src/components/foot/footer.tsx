import React from 'react';

import { Flex, Text } from 'rebass';

import Links from './links';
import MailingList from './mailing-list';

// outer wrapper has to be styled externally as if css props is passed it would overwrite the initial variant styling
import './footer.scss';

type Props = {};

const Footer: React.FC<Props> = () => {
    return (
        <Flex variant="outerWrapper" as="footer" bg="brown.0" my={[0]}>
            <Flex
                variant="innerWrapper"
                py={[8]}
                px={[8, 8, 7]}
                flexDirection={['column-reverse', 'column-reverse', 'row']}
                justifyContent={[
                    'space-between',
                    'space-between',
                    'space-between',
                    'flex-start',
                ]}
            >
                <Links />
                <MailingList />
            </Flex>
            <Text
                className="copyright"
                fontFamily="body"
                width="100vw"
                textAlign="center"
                fontSize={[0, 0, 1]}
            >
                Copyright
            </Text>
        </Flex>
    );
};

export { Footer };
