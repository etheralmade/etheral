import React from 'react';

import { Layout } from 'components/layout';
import { SEO } from 'components/seo';
import Contact from 'templates/contact';

const ContactPage = () => {
    return (
        <Layout>
            <SEO title="Etheral | Contact us" />
            <Contact />
        </Layout>
    );
};

export default ContactPage;
