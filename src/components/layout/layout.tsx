import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

// import firebase from 'firebase/app';
// import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';

import { theme, GlobalStyles } from '../../styles';
// Components
import { CSSDebugger } from '../css-debugger';
import Navigation from 'components/nav';
// import firebaseConfig from 'lib/firebase-config';

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

    // const firebaseApp = firebase.initializeApp(firebaseConfig);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <CSSDebugger />
            {/* <FirebaseAppProvider firebaseApp={firebaseApp}>
                <SuspenseWithPerf fallback={<></>} traceId="0">
                    <main>{children}</main>
                </SuspenseWithPerf>
    </FirebaseAppProvider> */}
            <main>
                <Navigation />
                {children}
            </main>
        </ThemeProvider>
    );
};

export { Layout };
