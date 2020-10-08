import React from 'react';

import ReSelect, { ValueType, ActionMeta } from 'react-select';
import { startCase } from 'lodash';

import { theme } from 'styles';

import './styles.scss';

type Props = {
    [key: string]: any; // enable additional customization
    options: string[];
    placeholder: string;
    handleChange: (
        value: ValueType<{
            value: string;
            label: string;
        }>,
        actionMeta: ActionMeta<{
            value: string;
            label: string;
        }>
    ) => void;
};

const Select: React.FC<Props> = ({
    options,
    placeholder,
    handleChange,
    ...rest
}) => {
    const customStyles = {
        option: (_: any, state: any) => ({
            transition: '.2s',
            padding: '8px 16px',
            borderRadius: 0,
            backgroundColor: state.isSelected
                ? '#333'
                : state.isFocused
                ? '#899'
                : '#fff',
            color: state.isSelected || state.isFocused ? '#fff' : '#222',
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            display: 'flex',
            border: `1px solid ${theme.colors.black[0]}`,
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: '0px 16px',
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: 0,
            marginTop: 0,
            border: `2px solid ${theme.colors.black[0]}`,
            borderTopWidth: 0,
        }),
    };

    return (
        <ReSelect
            className="custom-select"
            classNamePrefix="custom-select"
            styles={customStyles}
            onChange={handleChange}
            // placeholder={placeholder.toUpperCase()}
            options={options.map(o => ({
                value: o,
                // eslint-disable-next-line @typescript-eslint/tslint/config
                label: startCase(o.toLowerCase()),
            }))}
            {...rest}
        />
    );
};

export { Select };
