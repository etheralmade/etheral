import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { FirebaseAppProvider } from 'reactfire';

import { theme, GlobalStyles } from '../../styles';
// Components
import { CSSDebugger } from '../css-debugger';
import firebaseConfig from 'lib/firebase-config';

const Layout: React.FC = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);

    // const { title, description } = data.site.siteMetadata;

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <CSSDebugger />
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <Suspense fallback={<></>}>
                    <main>{children}</main>
                </Suspense>
            </FirebaseAppProvider>
        </ThemeProvider>
    );
};

export { Layout };
