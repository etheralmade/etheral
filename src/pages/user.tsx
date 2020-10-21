import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Layout } from 'components/layout';

const UserPage = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);
    const [db, setDb] = useState<firebase.firestore.Firestore | null>(null);

    useEffect(() => {
        setUser(firebase.auth().currentUser);
        setAuth(firebase.auth());
        setDb(firebase.firestore());

        // fetching all items ordered by this user.
        fetchItems();
    }, []);

    /**
     * fetching items ordered by this user.
     */
    const fetchItems = async () => {
        if (db && user) {
            try {
                // fetch user instance from db
                const req = await db
                    .collection('user')
                    .doc(user.uid)
                    .get();

                const data = await req.data();

                if (req.exists && data) {
                    // fetch user's orders
                    const orders = await data.orders;

                    // fetch items ordered within these orders
                    await fetchOrders(orders);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    /**
     * fetch details for every order a user gas,
     * @param orders
     */
    const fetchOrders = async (orders: string[]) => {
        if (db) {
            const items = Promise.all(
                orders.map(async order => {
                    try {
                        const req = await db
                            .collection('order')
                            .doc(order)
                            .get();
                    } catch (e) {
                        console.error(e);
                        return [];
                    }
                })
            );
        }
    };

    console.log(user);

    return user && auth ? (
        <Layout>
            <div className="content">
                <h1>User: {user.displayName}</h1>
                <button onClick={() => auth.signOut()}>Logout</button>
            </div>
        </Layout>
    ) : null;
};

export default UserPage;
