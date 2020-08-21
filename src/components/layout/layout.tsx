import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { FirebaseAppProvider } from 'reactfire';

import { theme, GlobalStyles } from '../../styles';
// Components
import { CSSDebugger } from '../css-debugger';
import { firebaseApp } from 'lib/firebase';

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
            <FirebaseAppProvider firebaseApp={firebaseApp}>
                <main>{children}</main>
            </FirebaseAppProvider>
        </ThemeProvider>
    );
};

export { Layout };
