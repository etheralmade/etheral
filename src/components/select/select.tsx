import React from 'react';

import ReSelect, { ValueType, ActionMeta } from 'react-select';
import { startCase, snakeCase } from 'lodash';

type Props = {
    options: string[];
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

const Select: React.FC<Props> = ({ options, handleChange }) => {
    return (
        <ReSelect
            onChange={handleChange}
            options={options.map(o => ({
                value: snakeCase(o.toUpperCase()),
                // eslint-disable-next-line @typescript-eslint/tslint/config
                label: startCase(o),
            }))}
        />
    );
};

export { Select };
