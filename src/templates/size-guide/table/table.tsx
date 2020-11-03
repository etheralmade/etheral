import React from 'react';
// import styling libs
import { Box, Text } from 'rebass';
// import local components

type Props = {};

type Data = {
    size: number;
    diameter: number;
    circum: number;
};

/**
 * Table component to display available sizes available..
 */
const Table: React.FC<Props> = () => {
    // data to be rendered.
    const data: Data[] = [
        { size: 5, diameter: 15.7, circum: 49.3 },
        { size: 6, diameter: 16.5, circum: 51.5 },
        { size: 7, diameter: 17.3, circum: 54.3 },
        { size: 8, diameter: 18.2, circum: 57.1 },
    ];

    const border = '2px solid #222';
    const textAlign: 'center' | 'left' = 'center';

    const baseTextStyle = {
        fontFamily: 'body',
        fontSize: 1,
        px: [6],
        py: [2],
        textAlign,
    };

    const headingStyle = {
        ...baseTextStyle,
        fontWeight: 'bold',
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, auto)',
                border,
                borderBottomWidth: 0,
            }}
        >
            {/* table heading! */}
            <Text
                {...headingStyle}
                sx={{
                    gridColumn: '1/2',
                    borderBottom: border,
                }}
            >
                SIZE
            </Text>
            <Text
                {...headingStyle}
                sx={{
                    gridColumn: '2/3',
                    borderLeft: border,
                    borderBottom: border,
                }}
            >
                DIAMATER
            </Text>
            <Text
                {...headingStyle}
                sx={{
                    gridColumn: '3/4',
                    borderLeft: border,
                    borderBottom: border,
                }}
            >
                CIRCUMFERENCE
            </Text>

            {/* render data */}
            {data.map(dt => (
                <React.Fragment key={dt.size}>
                    <Text
                        {...baseTextStyle}
                        sx={{
                            gridColumn: '1/2',
                            borderBottom: border,
                        }}
                    >
                        {dt.size}
                    </Text>
                    <Text
                        {...baseTextStyle}
                        sx={{
                            gridColumn: '2/3',
                            borderLeft: border,
                            borderBottom: border,
                        }}
                    >
                        {dt.diameter} mm
                    </Text>
                    <Text
                        {...baseTextStyle}
                        sx={{
                            gridColumn: '3/4',
                            borderLeft: border,
                            borderBottom: border,
                        }}
                    >
                        {dt.circum} mm
                    </Text>
                </React.Fragment>
            ))}
        </Box>
    );
};

export { Table };
