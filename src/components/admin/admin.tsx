import React, { useState } from 'react';
import { sha256 } from 'js-sha256';

import { ThemeProvider } from 'emotion-theming';

import Login from 'components/auth/login';
import { LoginProps } from 'components/auth/auth';
import Dashboard from './dashboard';
import { theme, GlobalStyles } from 'styles';
import Modal from 'components/modal';
import ChangePassword from './change-password';

type Props = {
    db: firebase.firestore.Firestore;
};

const Admin: React.FC<Props> = ({ db }) => {
    // set defult to true -> development only
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [changePassId, setChangePassId] = useState('');

    const adminUserDbRef = db.collection('admin-user');

    // password encrypted with sha256!!
    const login = async ({ email, password }: LoginProps) => {
        // authenticate user first
        const adminUser = await adminUserDbRef
            .where('email', '==', email)
            .where('password', '==', sha256(password))
            .get();

        const adminUserExists = (await adminUser.size) > 0;

        if (await adminUserExists) {
            setIsAuthenticated(true);
            setAdminEmail(email);

            if (password === '123456') {
                setShowModal(true);
                setChangePassId(adminUser.docs[0].id);
            }
        } else {
            console.log('unauthorized');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {showModal && (
                <Modal center={true}>
                    <ChangePassword
                        db={db}
                        changePassId={changePassId}
                        closeModal={() => {
                            setShowModal(false);
                        }}
                    />
                </Modal>
            )}
            {isAuthenticated ? (
                <Dashboard db={db} logout={logout} adminEmail={adminEmail} />
            ) : (
                <Login login={login} submitValue="Login as admin" />
            )}
        </ThemeProvider>
    );
};

export { Admin };
