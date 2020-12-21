import React from 'react';
import { PageProps } from 'gatsby';

import Thankyou, { Props } from 'templates/thankyou';
import { Layout } from 'components/layout';
import { SEO } from 'components/seo';

/**
 * Page component for thankyou page
 * @param props State and Page query
 */
const ThankyouPage = (props: PageProps) => {
    const { state } = props.location;

    if (state) {
        return (
            <Layout>
                <SEO title="Etheral | Thank you for your purchase" />
                <Thankyou {...(state as Props)} />
            </Layout>
        );
    } else {
        return <></>;
    }

    // handle messages if: va, alfa, cstore usw.
};

export default ThankyouPage;
