import React from 'react';
import { Link } from '@reach/router';

import UserIcon from '../assets/account';

type Props = {
    user: firebase.User | null;
    desktop: boolean; // two different components on nav! this attr is used to differentiate between desktop and mobile comp
};

const Account: React.FC<Props> = ({ user, desktop }) => {
    console.log(user);

    return (
        <Link
            to={'auth'}
            css={`
                text-align: left;
                display: ${desktop ? 'none' : 'inline-block'};
                margin-right: 16px;

                @media screen and (min-width: 48em) {
                    display: ${!desktop ? 'none' : 'flex'} !important;
                    align-items: center;
                    margin-bottom: 0;
                }
            `}
        >
            <UserIcon
                className={
                    desktop
                        ? 'icons black-on-dropdown-stroke hide-on-mobile'
                        : 'icons bigger hide-on-desktop'
                }
            />
        </Link>
    );
};

export { Account };
