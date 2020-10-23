import React from 'react';
import { PageProps } from 'gatsby';

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
        // redirect to homepage if state is not available
        return null;
    }
};

export default OrderPage;