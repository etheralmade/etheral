import React from 'react';
import { sha256 } from 'js-sha256';

import { useForm } from 'react-hook-form';

import { Box, Heading, Button, Text } from 'rebass';
import { Input, Label } from '@rebass/forms';

type Props = {
    db: firebase.firestore.Firestore;
    changePassId: string;
    closeModal: () => void;
};

const ChangePassword: React.FC<Props> = ({ db, changePassId, closeModal }) => {
    const { register, handleSubmit, errors } = useForm();

    const submit = async ({ newPassword }: any) => {
        await db
            .collection('admin-user')
            .doc(changePassId)
            .update({
                password: sha256(newPassword),
            });

        await closeModal();
    };

    return (
        <Box
            bg="#fff"
            p={[4]}
            width={[512]}
            sx={{ 'input[type=email]': { py: 4 } }}
            as="form"
            onSubmit={handleSubmit(submit)}
        >
            <Heading fontSize={[3]} mb={[3]}>
                Change your password
            </Heading>
            <Label
                htmlFor="new-password"
                sx={{ fontFamily: 'heading', fontSize: [1], mb: 2 }}
            >
                Password
            </Label>
            <Input
                type="password"
                variant="variants.authInput"
                id="new-password"
                placeholder="New password"
                name="newPassword"
                ref={register({
                    required: true,
                    minLength: 6,
                })}
            />

            {errors.newPassword && (
                <Text fontSize={1} fontFamily="body" color="misc.discount">
                    Please insert your new password (min 6 chars)
                </Text>
            )}

            <Button type="submit" width="100%" mt={5}>
                SET MY NEW PASSWORD
            </Button>
        </Box>
    );
};

export { ChangePassword };
