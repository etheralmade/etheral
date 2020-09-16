import React from 'react';
import { FixedObject } from 'gatsby-image';
import { Link } from '@reach/router';

import { Flex, Box } from 'rebass';

import Tile from 'components/tile';
import './campaign.scss';

export type Props = {
    campaignData: {
        url: string;
        campaignLink: string;
        campaignName: string;
        img: {
            sources: FixedObject | FixedObject[];
        };
    }[];
};

const Campaign: React.FC<Props> = ({ campaignData }) => (
    <Box variant="outerWrapper" my={[4, 4, 6]}>
        <Flex
            width="100%"
            flexWrap="wrap"
            className="wrap"
            justifyContent="space-evenly"
            alignItems="center"
            px={[4, 4, 0]}
        >
            {campaignData.map(campaign => (
                <Link key={campaign.campaignName} to={campaign.campaignLink}>
                    <Tile
                        tileOnText={campaign.campaignName.toUpperCase()}
                        img={campaign.img}
                        imgAlt={campaign.campaignName}
                        url={campaign.url}
                        overflow="hidden"
                        width="100%"
                        mb={[3, 3, 5]}
                        height={['90vw', '80vw', '48vw']}
                        maxHeight={['unset', 420, 'unset', 700, 1024]}
                    />
                </Link>
            ))}
        </Flex>
    </Box>
);

export { Campaign };
