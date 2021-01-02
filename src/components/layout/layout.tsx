import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';

import { theme, GlobalStyles } from 'styles';
// Components
import { CSSDebugger } from '../css-debugger';
import Navigation from 'components/nav';
import useFonts from 'helper/use-fonts';
import Footer from 'components/foot';
// import firebaseConfig from 'lib/firebase-config';

const Layout: React.FC<{ isShowingBlog?: boolean }> = ({
    children,
    isShowingBlog = false,
}) => {
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

    useFonts();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {/* <CSSDebugger />  */}
            <main
                style={{
                    backgroundColor: isShowingBlog ? '#fff' : '',
                }}
            >
                <Navigation />
                {children}
                <Footer />
            </main>
        </ThemeProvider>
    );
};

export { Layout };
