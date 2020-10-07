import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Flex, Box, Text, Button } from 'rebass';
import { Input, Label, Textarea } from '@rebass/forms';

import Modal from 'components/modal';

import 'regenerator-runtime/runtime';

type Props = {};

type Fields = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

enum Status {
    NONE,
    SENDING,
    SENT,
    ERROR,
}

const Form: React.FC<Props> = () => {
    const [status, setStatus] = useState<Status>(Status.NONE);

    const { register, errors, handleSubmit } = useForm<Fields>();

    // call cloud function to send an email to asketheral@gmail
    const send = async (data: Fields) => {
        const { firstName, lastName, email, subject, phone, message } = data;

        await setStatus(Status.SENDING);

        const url =
            process.env.NODE_ENV === 'production'
                ? ''
                : '/send-email/?type=CONTACT';

        const body = {
            name: `${firstName} ${lastName}`,
            email,
            phone,
            subject,
            message: message.split('\n').join('//n'), // replace js linebreak to a code.
        };

        try {
            const req = await axios.post(url, body);

            const { status: statusCode } = (await req) as any;

            // handle success submit form!
            await setStatus(statusCode === 200 ? Status.SENT : Status.ERROR);
        } catch {
            setStatus(Status.ERROR);
        }
    };

    const textAlignAttr: 'left' | 'center' = 'left';

    const errorStyling = {
        variant: 'formError',
        textAlign: textAlignAttr,
        mt: [3],
        role: 'alert',
    };

    return (
        <Box
            as="form"
            width="100%"
            onSubmit={handleSubmit(send)}
            sx={{ position: 'relative' }}
        >
            {status === Status.SENDING && (
                <Modal center={true}>
                    <Text
                        fontFamily="body"
                        fontSize={[2, 2, 3]}
                        fontWeight="regular"
                        color="#fff"
                    >
                        SENDING..
                    </Text>
                </Modal>
            )}

            {status === Status.SENT && (
                <Flex
                    variant="center"
                    bg="rgba(255, 255, 255, 0.8)"
                    height="100%"
                    width="100%"
                    sx={{ position: 'absolute' }}
                >
                    <Text
                        fontFamily="body"
                        fontSize={[2, 2, 3]}
                        fontWeight="regular"
                        color="#000"
                    >
                        YOUR CONTACT FORM IS SENT!
                    </Text>
                </Flex>
            )}

            <Flex flexWrap="wrap">
                {/* first name */}
                <Box width={['100%', '100%', '46%']} mr={[0, 0, '8%']}>
                    <Label variant="text.formLabel" htmlFor="first-name">
                        FIRST NAME
                    </Label>
                    <Input
                        id="first-name"
                        name="firstName"
                        type="text"
                        variant="variants.authInput"
                        placeholder="First Name"
                        ref={register({
                            required: true,
                        })}
                    />
                    {errors.firstName && (
                        <Text {...errorStyling}>Please enter your name</Text>
                    )}
                </Box>

                {/* last name */}
                <Box width={['100%', '100%', '46%']}>
                    <Label variant="text.formLabel" htmlFor="last-name">
                        LAST NAME
                    </Label>
                    <Input
                        id="last-name"
                        name="lastName"
                        type="text"
                        variant="variants.authInput"
                        placeholder="Last Name"
                        ref={register}
                    />
                </Box>

                {/* email addr */}
                <Box width={['100%', '100%', '46%']} mr={[0, 0, '8%']}>
                    <Label variant="text.formLabel" htmlFor="email">
                        EMAIL
                    </Label>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        variant="variants.authInput"
                        placeholder="Email"
                        ref={register({
                            required: true,
                        })}
                    />
                    {errors.email && (
                        <Text {...errorStyling}>Please enter your email</Text>
                    )}
                </Box>

                {/* phone num */}
                <Box width={['100%', '100%', '46%']}>
                    <Label variant="text.formLabel" htmlFor="phone">
                        PHONE
                    </Label>
                    <Input
                        name="phone"
                        id="phone"
                        type="number"
                        variant="variants.authInput"
                        placeholder="Phone Number"
                        ref={register({
                            required: true,
                        })}
                    />
                    {errors.phone && (
                        <Text {...errorStyling}>
                            Please enter your phone number
                        </Text>
                    )}
                </Box>

                {/* subject => to email's subject */}
                <Label variant="text.formLabel" htmlFor="subject">
                    SUBJECT
                </Label>
                <Input
                    name="subject"
                    id="subject"
                    type="text"
                    variant="variants.authInput"
                    placeholder="Subject"
                    ref={register({
                        required: true,
                    })}
                />
                {errors.subject && (
                    <Text {...errorStyling}>Please enter a subject</Text>
                )}

                {/* message => 'email body' */}
                <Label variant="text.formLabel" htmlFor="message">
                    MESSAGE
                </Label>
                <Textarea
                    name="message"
                    id="message"
                    variant="variants.authInput"
                    placeholder="Message"
                    className="custom-scrollbar"
                    sx={{
                        resize: 'vertical',
                        height: [150, 150, 200],
                    }}
                    ref={register({
                        required: true,
                    })}
                />
                {errors.message && (
                    <Text {...errorStyling}>Please enter your message</Text>
                )}
            </Flex>
            <Button type="submit" m="0 auto" px={[9]} mt={[5, 5, 6]}>
                SEND
            </Button>
            {status === Status.ERROR && (
                <Text {...errorStyling} width="100%" textAlign="center">
                    Oops! something is not right. Please try again
                </Text>
            )}
        </Box>
    );
};

export { Form };
