import React, { useState } from 'react';
import { sha256 } from 'js-sha256';

import Login from 'components/auth/login';
import { LoginProps } from 'components/auth/auth';

type Props = {
    db: firebase.firestore.Firestore;
};

const Admin: React.FC<Props> = ({ db }) => {
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
            console.log(sha256(password));
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <div data-testid="dashboard">
                    <h2>Welcome to admin dashboard</h2>
                    <button
                        onClick={() => {
                            setIsAuthenticated(false);
                        }}
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <Login login={login} submitValue="Login as admin" />
            )}
        </>
    );
};

export { Admin };
