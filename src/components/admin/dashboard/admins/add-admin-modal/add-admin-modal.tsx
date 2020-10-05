import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Heading, Flex, Button, Text } from 'rebass';
import { Label, Input } from '@rebass/forms';

type Props = {
    yes: (email: string) => void; // calls addAdmin() from admins component
    no: () => void; // close modal.
};
/**
 * basic component to make sure admin is going to be added
 */
const AddAdminModal: React.FC<Props> = ({ yes, no }) => {
    const [showSure, setShowSure] = useState(false);
    const [email, setEmail] = useState('');

    const { register, errors, handleSubmit } = useForm();

    const submit = ({ adminEmail }: any) => {
        setEmail(adminEmail);
        setShowSure(true);
    };

    return !showSure ? (
        <Box
            bg="#fff"
            p={[4]}
            width={[512]}
            sx={{ 'input[type=email]': { py: 4 } }}
            as="form"
            onSubmit={handleSubmit(submit)}
        >
            <Heading fontSize={[3]} mb={[3]}>
                Add admin member
            </Heading>
            <Label
                htmlFor="admin-email"
                sx={{ fontFamily: 'heading', fontSize: [1], mb: 2 }}
            >
                Admin email address:
            </Label>
            <Input
                type="email"
                variant="variants.authInput"
                id="admin-email"
                placeholder="New admin email address"
                name="adminEmail"
                ref={register({
                    required: true,
                })}
            />

            {errors.adminEmail && (
                <Text fontSize={1} fontFamily="body" color="misc.discount">
                    Please add a valid email address
                </Text>
            )}

            <Button width="100%" mt={5} type="submit">
                Add admin
            </Button>
            <Button width="100%" mt={2} bg="misc.discount" onClick={no}>
                Cancel
            </Button>
        </Box>
    ) : (
        <Box bg="#fff" p={[4]} width={[512]}>
            <Heading fontSize={[3]} mb={[3]}>
                Are you sure?
            </Heading>
            <Flex mt={5}>
                <Button width="100%" mr={3} onClick={() => yes(email)}>
                    Yes
                </Button>
                <Button
                    width="100%"
                    bg="misc.discount"
                    onClick={() => setShowSure(false)}
                >
                    No
                </Button>
            </Flex>
        </Box>
    );
};

export { AddAdminModal };
