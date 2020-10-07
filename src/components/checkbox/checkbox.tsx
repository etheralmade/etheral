import React from 'react';
import { useFormContext } from 'react-hook-form';

// import styling libs
import checkFill from '@iconify/icons-ri/check-fill';
import { Icon } from '@iconify/react';
import { Flex } from 'rebass';
import { Input, Label } from '@rebass/forms';

// import local components

type Props = {
    name: string;
    id: string;
    text: string;
};

/**
 * reusable custom checkbox component
 * TODO: improve performance using memo?
 * https://react-hook-form.com/api/#useFormContext
 * @param param0 component's props
 */
const Checkbox: React.FC<Props> = ({ name, id, text }) => {
    const { register } = useFormContext();

    return (
        <>
            <Input
                name={name}
                id={id}
                ref={register}
                type="checkbox"
                css={`
                    display: none !important;

                    &:checked + label #${id}-checkbox {
                        background-color: #222;
                        svg: {
                            height: 80%;
                            width: 80%;
                        }
                    }
                `}
            />
            <Label
                htmlFor={id}
                variant="text.formLabel"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Flex
                    variant="center"
                    id={`${id}-checkbox`}
                    height={[14]}
                    width={[14]}
                    mr={[3]}
                    sx={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'black.0',
                        transition: '0.2s',
                    }}
                >
                    <Icon icon={checkFill} color="#fff" />
                </Flex>
                {text}
            </Label>
        </>
    );
};

export { Checkbox };
