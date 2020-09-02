import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from 'components/layout';

const ThankyouPage = (props: PageProps) => {
    const { state } = props.location;

    if (state) {
        const {
            oid,
            paymentNo,
            paymentName,
            expired,
            totalPrice,
        } = state as any;

        return (
            <Layout>
                <h2>Hi thank you for your order!</h2>
                <p>
                    Please transfer IDR {totalPrice} to {paymentNo} with the
                    following name: {paymentName} before {expired}
                </p>
            </Layout>
        );
    } else {
        return <></>;
    }

    // handle messages if: va, alfa, cstore usw.
};

export default ThankyouPage;
