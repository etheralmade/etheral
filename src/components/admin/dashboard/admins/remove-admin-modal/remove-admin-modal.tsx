import React from 'react';

import { Box, Flex, Button, Heading } from 'rebass';

type Props = {
    toRemoveAdmin: string;
    yes: () => void;
    no: () => void;
};

const RemoveAdminModal: React.FC<Props> = ({ toRemoveAdmin, yes, no }) => {
    return (
        <Box bg="#fff" p={[4]} width={[512]}>
            <Heading mb={[3]} fontSize={3}>
                Are you sure you want to remove {toRemoveAdmin} from etheral
                admin?
            </Heading>
            <Flex>
                <Button width="100%" mr={3} onClick={yes}>
                    Yes
                </Button>
                <Button width="100%" bg="misc.discount" onClick={no}>
                    No
                </Button>
            </Flex>
        </Box>
    );
};

export { RemoveAdminModal };
