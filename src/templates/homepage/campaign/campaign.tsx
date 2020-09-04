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
        <Flex variant="outerWrapper" my={[7]}>
            <Box variant="innerWrapper">
                <Heading textAlign="center" as="h2" variant="h2" mb={[5]}>
                    Explore
                </Heading>
                <Flex
                    width="100%"
                    flexWrap="wrap"
                    className="wrap"
                    justifyContent="space-evenly"
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
                                height={['90vw', '80vw', 320, '38.4vw']}
                            />
                        </Link>
                    ))}
                </Flex>
            </Box>
        </Flex>
    );
};

export { Campaign };
