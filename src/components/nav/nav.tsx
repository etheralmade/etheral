import React, { useState } from 'react';
// import { useStaticQuery } from 'gatsby';
import { Link } from '@reach/router';
import { Cart } from './cart/cart';

type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
};

const Navigation: React.FC<Props> = ({ auth, db }) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    // const collections = useStaticQuery();

    // mock links for testing purposes
    return (
        <div style={{ display: 'flex' }}>
            <Link to="/collection1">Collection1</Link>
            <Link to="/collection2">Collection2</Link>
            <Link to="/checkout">
                <button>Go to checkout</button>
            </Link>
            <Cart user={user} db={db} />
        </div>
    );
};

export { Navigation };
