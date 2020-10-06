import React, { useState } from 'react';

import { Box, Heading, Flex } from 'rebass';
import { Input, Label, Textarea } from '@rebass/forms';

type Props = {
    register: any; // register attr from useForm.
};

const TEXTAREA_MAX_CHARS = 100;

/**
 * personalised msg form => user should be able to add personalized msg on their order.
 */
const Message: React.FC<Props> = ({ register }) => {
    // word counter on textarea
    const [char, setChar] = useState(TEXTAREA_MAX_CHARS);

    const handleChangeTextarea = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { target } = event;
        if (target) {
            const wordLength = target.value.length;

            setChar(TEXTAREA_MAX_CHARS - wordLength);
        }
    };

    return (
        <Box>
            <Heading as="h3" variant="h4" fontSize={[1, 1, 3]} my={[6]}>
                PERSONALIZED MESSAGE (OPTIONAL)
            </Heading>

            <Flex flexWrap="wrap" width="100%" justifyContent="space-between">
                {/* FOR */}
                <Box width="48%">
                    <Label htmlFor="for-name" variant="text.formLabel" mt={[0]}>
                        FOR
                    </Label>
                    <Input
                        type="text"
                        name="forName"
                        id="for-name"
                        variant="variants.authInput"
                        placeholder="FOR"
                        ref={register}
                    />
                </Box>

                {/* FROM */}
                <Box width="48%">
                    <Label
                        htmlFor="from-name"
                        variant="text.formLabel"
                        mt={[0]}
                    >
                        FROM
                    </Label>
                    <Input
                        type="text"
                        name="fromName"
                        id="from-name"
                        variant="variants.authInput"
                        placeholder="FROM"
                        ref={register}
                    />
                </Box>

                {/* MESSAGE! */}
                <Box width="100%">
                    <Label htmlFor="message" variant="text.formLabel">
                        MESSAGE ({char} remaining)
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        className="custom-scrollbar"
                        sx={{
                            resize: 'vertical',
                            height: [100, 100, 150],
                        }}
                        maxLength={100}
                        variant="variants.authInput"
                        placeholder="INSERT YOUR MESSAGE (MAX 100 CHAR)"
                        onChange={handleChangeTextarea}
                        ref={register({
                            maxLength: 100,
                        })}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export { Message };
