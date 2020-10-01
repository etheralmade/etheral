import React from 'react';

import { Box, Text, Link } from 'rebass';

export type Props = {
    address: string;
    location: string;
    name: string;
    phoneNumber: string;
    web: string;
    zipCode: string;
};

const StockistItem: React.FC<Props> = ({
    name,
    address,
    phoneNumber,
    zipCode,
    web,
}) => {
    return (
        <Box
            as="li"
            sx={{
                listStyleType: 'none',
                textAlign: ['centerr', 'center', 'left'],
            }}
            my={[4]}
        >
            <Text
                fontSize={[1, 1, 2]}
                fontWeight="semiBold"
                fontFamily="body"
                mb={[3]}
            >
                {name}
            </Text>
            <Text
                as="p"
                fontSize={[0, 0, 1]}
                fontWeight="regular"
                fontFamily="body"
                width={['80%', '80%', '100%']}
                m="0 auto"
            >
                {address}
                <br />
                {zipCode}
                <br />
                {phoneNumber}
                <br />
            </Text>
            <Link
                href={`http://${web}`}
                mt={[1]}
                sx={{
                    fontSize: [0, 0, 1],
                    fontWeight: 'regular',
                    fontFamily: 'body',
                    textDecoration: 'none',
                }}
            >
                {web}
            </Link>
        </Box>
    );
};

export { StockistItem };
