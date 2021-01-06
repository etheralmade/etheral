import React from 'react';
import Select, { ValueType } from 'react-select';
import { useDispatch } from 'react-redux';
import { get, findIndex } from 'lodash';

import {
    Currencies,
    IState as ICurrencyState,
} from 'state/reducers/currency-reducer';
import { changeCurrency } from 'state/actions/currency';
import { theme } from 'styles';

import './styles.scss';
export type Props = {
    showDropdown: boolean;
    desktop: boolean;
    currLocation: string;
};

const CurrencySelector: React.FC<Props & ICurrencyState> = ({
    currency,
    showDropdown,
    desktop,
    currLocation,
}) => {
    const dispatch = useDispatch();

    // updates global state on change
    const handleChange = (
        val: ValueType<{
            value: Currencies;
            label: string;
        }>
    ) => {
        switch (get(val, 'value', '')) {
            case 'IDR':
                dispatch(changeCurrency(Currencies.IDR));
                break;
            case 'AUD':
                dispatch(changeCurrency(Currencies.AUD));
                break;
            default:
                break;
        }
    };

    // custom styling for react-select
    const customStyles = {
        menu: (provided: any) => ({
            ...provided,
            padding: 0,
            borderRadius: 0,
            width: 'fit-content',
            zIndex: 4,
        }),
        option: (provided: any, state: any) => {
            const { isFocused, isSelected } = state;
            return {
                ...provided,
                fontFamily: theme.fonts.heading,
                padding: 8,
                backgroundColor: '#fff',
                color: '#222',
                fontWeight: isSelected || isFocused ? 600 : 400,
                fontSize: '14px',
                transition: '0.2s',
                cursor: 'pointer',
            };
        },
        indicatorSeparator: () => ({
            display: 'none',
        }),
        indicator: () => ({
            padding: 0,
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 86,
            display: 'flex',
            fontFamily: theme.fonts.heading,
            color: '#fff',
        }),
        singleValue: (provided: any, state: any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            const color =
                showDropdown || currLocation !== '/' ? '#000' : '#fff';
            const fontSize = '14px';

            return {
                ...provided,
                opacity,
                transition,
                color,
                fontSize,
            };
        },
        valueContainer: (provided: any) => ({
            ...provided,
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            padding: 0,
            position: 'relative',
            left: '-12px',
        }),
    };

    // options for select component
    // display IDR - Indonesia => just on menu => hardcoded id => on styles.scss
    const options = [
        { value: Currencies.IDR, label: 'IDR', className: 'ID' },
        // { value: Currencies.AUD, label: 'AUD', className: 'AU' }, uncomment this when AUD support is coming.
    ];

    // default value => fetched from global state
    const defaultValue = options[findIndex(options, o => o.value === currency)];

    return (
        <Select
            defaultValue={defaultValue}
            options={options}
            onChange={handleChange}
            className={desktop ? 'hide-on-mobile' : 'hide-on-desktop'}
            styles={customStyles}
            aria-label="Change currency"
        />
    );
};

export { CurrencySelector };
