import React, { useState } from 'react';
import { sha256 } from 'js-sha256';

import Login from 'components/auth/login';
import { LoginProps } from 'components/auth/auth';
import Dashboard from './dashboard';

type Props = {
    db: firebase.firestore.Firestore;
};

const Admin: React.FC<Props> = ({ db }) => {
    // set defult to true -> development only
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const adminUserDbRef = db.collection('admin-user');

    const login = async ({ email, password }: LoginProps) => {
        // authenticate user first
        const adminUser = await adminUserDbRef
            .where('email', '==', email)
            .where('password', '==', sha256(password))
            .get();

        const adminUserExists = (await adminUser.size) > 0;

        if (await adminUserExists) {
            setIsAuthenticated(true);
        } else {
            console.log('unauthorized');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <>
            {isAuthenticated ? (
                <Dashboard logout={logout} />
            ) : (
                <Login login={login} submitValue="Login as admin" />
            )}
        </>
    );
};

export { Admin };
