import React from 'react';

import { Box, Button, Heading, Text, Flex } from 'rebass';
import { InlineIcon, Icon } from '@iconify/react';
import closeFill from '@iconify/icons-ri/close-fill';
import checkLine from '@iconify/icons-ri/check-line';

type Props = {
    yes: () => void;
    no: () => void;
    close: () => void;
};

const SurePopupSettings: React.FC<Props> = ({ yes, no, close }) => {
    return (
        <Box bg="white.0" p={[7]} sx={{ position: 'relative' }}>
            <Box
                onClick={close}
                sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    '&:hover': { cursor: 'pointer' },
                    '& svg': { width: 24, height: 24 },
                }}
            >
                <Icon icon={closeFill} />
            </Box>
            <Heading variant="h2" mb={[3]}>
                Are you sure you want to update the website now?
            </Heading>
            <Text variant="body" color="black.1">
                By clicking &apos;yes&apos; the website would be automatically
                updated and ready to browse in about 5 minutes
            </Text>
            <Flex mt={[3]}>
                <Button
                    onClick={yes}
                    bg="badges.3"
                    color="#000"
                    mr={[3]}
                    fontWeight="bold"
                    sx={{
                        borderRadius: 4,
                        '& svg': {
                            width: 16,
                            height: 16,
                            transform: 'translate(0, 20%) !important',
                            mr: [3],
                        },
                    }}
                >
                    <InlineIcon icon={checkLine} />
                    Yes
                </Button>
                <Button
                    onClick={no}
                    bg="badges.4"
                    color="#000"
                    fontWeight="bold"
                    sx={{
                        borderRadius: 4,
                        '& svg': {
                            width: 16,
                            height: 16,
                            transform: 'translate(0, 20%) !important',
                            mr: [3],
                        },
                    }}
                >
                    <InlineIcon icon={closeFill} />
                    No
                </Button>
            </Flex>
        </Box>
    );
};

export { SurePopupSettings };
