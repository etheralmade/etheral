import React from 'react';
import { FixedObject } from 'gatsby-image';
import { Link } from '@reach/router';

import { Flex, Heading, Box } from 'rebass';

import Tile from 'components/tile';
import './campaign.scss';

type Props = {
    campaignData: {
        url: string;
        campaignLink: string;
        campaignName: string;
        img: {
            sources: FixedObject | FixedObject[];
        };
    }[];
};

const Campaign: React.FC<Props> = ({ campaignData }) => {
    return (
        <Box variant="outerWrapper" my={[4, 4, 6]}>
            {/* <Heading textAlign="center" as="h2" variant="h2" mb={[5, 5, 6, 7]}>
                Explore
            </Heading> */}
            <Flex
                width="100%"
                flexWrap="wrap"
                className="wrap"
                justifyContent="space-evenly"
                alignItems="center"
            >
                {campaignData.map(campaign => (
                    <Link
                        key={campaign.campaignName}
                        to={campaign.campaignLink}
                    >
                        <Tile
                            tileOnText={campaign.campaignName}
                            img={campaign.img}
                            imgAlt={campaign.campaignName}
                            url={campaign.url}
                            overflow="hidden"
                            width="100%"
                            mb={[5]}
                            height={['90vw', '80vw', 320, '32vw', '46vw']}
                            maxHeight={['unset', 'unset', 'unset', 640, 720]}
                        />
                    </Link>
                ))}
            </Flex>
        </Box>
    );
};

export { Campaign };
