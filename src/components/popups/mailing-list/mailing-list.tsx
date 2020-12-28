import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import axios from 'axios';

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
            imgXS: file(relativePath: { eq: "mail-popup.jpg" }) {
                childImageSharp {
                    fixed(height: 240, width: 240, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
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

    const { imgS, imgL, imgXS } = data as any;

    const [email, setEmail] = useState('');

    /**
     * Subscribe to mailing list function..
     */
    const subscribe = async (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        // call the serverless function
        const url =
            process.env.NODE_ENV === 'production'
                ? ''
                : '/subscribe-mailing-list/';

        try {
            await axios.post(`${url}?email=${email}`);
            await closeModal();
        } catch (e) {
            console.error(e);
        }
    };

    if (imgS && imgL) {
        const sources = [
            {
                ...imgL.childImageSharp.fixed,
                media: '(min-height: 400px) and (min-width: 900px)',
            },
            {
                ...imgXS.childImageSharp.fixed,
                media: '(max-width: 340px)',
            },
            imgS.childImageSharp.fixed,
        ];

        return (
            <Flex
                flexDirection={['column', 'row']}
                sx={{ position: 'relative' }}
                maxWidth="90vw"
                maxHeight="90vh"
                css={``}
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
                        '&:hover': {
                            cursor: 'pointer',
                        },
                        '& > svg': {
                            height: [24, 24, 36],
                            width: [24, 24, 36],
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
                    px={[4, 6, 6, 8]}
                    py={[4, 4, 6, 8]}
                    flexDirection="column"
                    css={`
                        height: fit-content;
                        width: 300px;

                        justify-content: space-between;

                        /* edge space-evenly progressive enhancement. */
                        @supports not (-ms-ime-align: auto) {
                            justify-content: space-evenly;
                        }

                        @media screen and (max-width: 340px) {
                            width: 240px;
                        }

                        @media screen and (min-width: 27em) {
                            height: 300px;
                        }

                        @media screen and (min-width: 900px) {
                            height: 400px;
                            width: 400px;
                        }
                    `}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <Heading
                            as="h3"
                            variant="h2"
                            fontWeight="bold"
                            id="subscribe-newsletter-popup"
                        >
                            SUBSCRIBE TO OUR NEWSLETTER
                        </Heading>
                        <Text
                            variant="h2"
                            mt={[3]}
                            fontWeight="body"
                            color="black.1"
                            fontSize={[2, 2, 3]}
                        >
                            To get your 10% off your first purchase
                        </Text>
                    </Box>
                    <Box
                        as="form"
                        my={[6]}
                        sx={{
                            'input[type=email]': {
                                fontSize: [1, 1, 2],
                                textAlign: 'center',
                            },
                        }}
                        onSubmit={subscribe}
                    >
                        <Input
                            type="email"
                            aria-labelledby="subscribe-newsletter-popup"
                            placeholder="Enter your email address here"
                            variant="variants.textInput"
                            width={['100%']}
                            maxWidth="100%"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
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
