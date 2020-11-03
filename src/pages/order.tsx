import React, { useState, useEffect } from 'react';
import { PageProps } from 'gatsby';
import { findIndex } from 'lodash';
import firebase from 'gatsby-plugin-firebase'; // needed if no state is given.

import { Box, Text } from 'rebass';
import { Layout } from 'components/layout';

import { Order as OrderSchema } from 'helper/schema';
import Order from 'templates/order';

const OrderPage = (props: PageProps) => {
    // extract state from the location props.
    const { state } = props.location;

    // get order attr from state
    if (state) {
        const { order }: { order: OrderSchema } = state as any;

        return (
            <Layout>
                <Order order={order} />
            </Layout>
        );
    } else {
        // return <h1>Hello, world!</h1>;/
        const { search } = props.location;
        const params = search
            .substr(1)
            .split('&')
            .map(param => param.split('='));
        const oidIndex = findIndex(params, o => o[0] === 'oid');

        // no params is found.
        if (oidIndex === -1) {
            return null;
        }

        return (
            <Layout>
                <OrderPageAsync oid={params[oidIndex][1]} />
            </Layout>
        );
    }
};

/**
 * order page if state is not provided -> should be fetched from the db.
 * @param oid order ID: string
 */
const OrderPageAsync: React.FC<{ oid: string }> = ({ oid }) => {
    const [db, setDb] = useState<firebase.firestore.Firestore | null>(null);

    // set order to undefined first, then null if order is not found
    const [order, setOrder] = useState<OrderSchema | undefined | null>(
        undefined
    );

    useEffect(() => {
        setDb(firebase.firestore());
    }, []);

    useEffect(() => {
        if (db && order === undefined) {
            fetchOrder(oid);
        }
    }, [db]);

    /**
     * function to fetch order from the database
     * @param id Order ID: string
     */
    const fetchOrder = async (id: string) => {
        if (db) {
            const dbRef = db.collection('order').doc(id);

            const req = await dbRef.get();
            const data = await req.data();

            // set to null if data is undefined
            if (await !data) {
                setOrder(null);
                return;
            }

            // if data is available: set order with data provided
            setOrder({ ...data, date: data.date.toDate() } as OrderSchema);
        }
    };

    if (!db) {
        return null;
    }

    if (order === undefined) {
        return null;
    }

    return order === null ? (
        <Box className="content" px={[5, 5, 10]}>
            <Text variant="h3" fontSize={[4, 4, 5]}>
                Your order is not found..
            </Text>
        </Box>
    ) : (
        <Order order={order} />
    );
};

export default OrderPage;
