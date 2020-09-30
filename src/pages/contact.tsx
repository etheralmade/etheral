import React from 'react';
import { PageProps } from 'gatsby';

import { Layout } from 'components/layout';
import Contact from 'templates/contact';

const AboutPage = (props: PageProps) => {
    return (
        <Layout>
            <Contact />
        </Layout>
    );
};

export default AboutPage;
