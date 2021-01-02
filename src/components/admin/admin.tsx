import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';

import { Box, Text } from 'rebass';
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

    const [isUnauthorized, setIsUnauthorized] = useState(false);

    const adminUserDbRef = db.collection('admin-user');

    const debug = true;

    useEffect(() => {
        // skipping login on debug
        if (debug) {
            setIsAuthenticated(true);
            setAdminEmail('asketheral@gmail.com');
        }
    }, []);

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
            setIsUnauthorized(true);
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
                <Modal center={true}>
                    <Box bg="#fff" p={[5]} width={['80vw', '70vw', '400px']}>
                        <Login login={login} submitValue="Login as admin" />
                        {isUnauthorized && (
                            <Text
                                variant="formError"
                                mt={[4]}
                                sx={{ textAlign: 'center' }}
                            >
                                Admin user unauthorized
                            </Text>
                        )}
                    </Box>
                </Modal>
            )}
        </ThemeProvider>
    );
};

export { Admin };
