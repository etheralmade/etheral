import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';

const ThankyouPage = (props: PageProps) => {
    console.log(props);

    const { oid, paymentNo, paymentName, expired, totalPrice } = props.location
        .state as any;

    // handle messages if: va, alfa, cstore usw.

    console.log(oid);

    return (
        <Layout>
            <h2>Hi thank you for your order!</h2>
            <p>
                Please transfer IDR {totalPrice} to {paymentNo} with the
                following name: {paymentName} before {expired}
            </p>
        </Layout>
    );
};

export default ThankyouPage;
