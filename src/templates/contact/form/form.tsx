import React from 'react';
import { useForm } from 'react-hook-form';

import { Flex, Box, Text, Button } from 'rebass';
import { Input, Label, Textarea } from '@rebass/forms';

type Props = {};

type Fields = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

const Form: React.FC<Props> = () => {
    const { register, errors, handleSubmit } = useForm<Fields>();

    // call cloud function to send an email to asketheral@gmail
    const send = (data: Fields) => {
        console.log(data);
    };

    const textAlignAttr: 'left' | 'center' = 'left';

    const errorStyling = {
        variant: 'formError',
        textAlign: textAlignAttr,
        mt: [3],
        role: 'alert',
    };

    return (
        <Box as="form" width="100%" onSubmit={handleSubmit(send)}>
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
                    sx={{
                        resize: 'vertical',
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
        </Box>
    );
};

export { Form };
