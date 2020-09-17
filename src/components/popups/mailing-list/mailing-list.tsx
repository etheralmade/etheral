import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Flex, Box, Text, Heading } from 'rebass';
import { Input } from '@rebass/forms';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-ri/close-fill';

type Props = {
    closeModal: () => void;
};

const MailingList: React.FC<Props> = ({ closeModal }) => {
    const data = useStaticQuery(graphql`
        query {
            imgS: file(relativePath: { eq: "mail-popup.jpg" }) {
                childImageSharp {
                    fixed(height: 300, width: 300, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
            imgL: file(relativePath: { eq: "mail-popup.jpg" }) {
                childImageSharp {
                    fixed(height: 400, width: 400, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    const { imgS, imgL } = data as any;
    if (imgS && imgL) {
        const sources = [
            {
                ...imgL.childImageSharp.fixed,
                media: '(min-height: 400px) and (min-width: 900px)',
            },
            imgS.childImageSharp.fixed,
        ];

        return (
            <Flex
                flexDirection={['column', 'row']}
                sx={{ position: 'relative' }}
            >
                <Box
                    onClick={closeModal}
                    role="button"
                    aria-label="close-modal-button"
                    sx={{
                        position: 'absolute',
                        top: [1],
                        right: [1],
                        zIndex: 2000,
                        '& > svg': {
                            height: [24],
                            width: [24],
                            path: {
                                fill: ['#fff', '#000'],
                            },
                        },
                    }}
                >
                    <Icon icon={closeFill} id="close-popup" />
                </Box>
                <Img fixed={sources} alt="bracelet" />
                <Flex
                    bg="white.0"
                    p={[4, 6, 6, 8]}
                    flexDirection="column"
                    justifyContent="space-evenly"
                    css={`
                        height: fit-content;
                        width: 300px;

                        @media screen and (min-width: 27em) {
                            height: 300px;
                        }

                        @media screen and (min-width: 900px) {
                            height: 400px;
                            width: 400px;
                        }
                    `}
                >
                    <Box>
                        <Heading
                            as="h3"
                            variant="h3"
                            id="subscribe-newsletter-popup"
                        >
                            SUBSCRIBE TO OUR NEWSLETTER
                        </Heading>
                        <Text variant="body" mt={[3]}>
                            To get your 10% off your first purchase
                        </Text>
                    </Box>
                    <Box as="form" my={[6]}>
                        <Input
                            type="email"
                            aria-labelledby="subscribe-newsletter-popup"
                            placeholder="Enter your email address here"
                            variant="variants.textInput"
                            width={['100%']}
                            maxWidth="100%"
                        />
                        <Input
                            type="submit"
                            variant="buttons.primary"
                            value="GET 10% OFF"
                            sx={{ border: 'none', mt: [5] }}
                        />
                    </Box>
                </Flex>
            </Flex>
        );
    }

    return null;
};

export { MailingList };
