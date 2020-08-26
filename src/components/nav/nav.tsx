import React, { useState, useEffect } from 'react';
// import { useStaticQuery } from 'gatsby';
import { Link } from '@reach/router';
import Cart from './cart';

type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
};

const Navigation: React.FC<Props> = ({ auth, db }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }
    }, []);

    const logout = async () => {
        try {
            await auth.signOut();
            await setUser(null);
        } catch (e) {
            console.error(e);
        }
    };

    // mock links for testing purposes
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Link to="/collection1">Collection1</Link>
            <Link to="/collection2">Collection2</Link>
            <Link to="/checkout">
                <button>Go to checkout</button>
            </Link>
            {!user ? (
                <Link to="/auth">
                    <button>Login</button>
                </Link>
            ) : (
                <>
                    <button onClick={logout}>Log out</button>
                    <h3>User name: {user.displayName}</h3>
                </>
            )}
            <Cart user={user} db={db} />
        </div>
    );
};

export { Navigation };
