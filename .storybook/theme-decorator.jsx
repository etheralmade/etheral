import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { theme, GlobalStyles } from '../src/styles';
// import useGoogleFonts from '../src/helper/useGoogleFonts';

const ThemeDecorator = storyFn => {
    // useGoogleFonts();

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
        </>
    );
};
export default ThemeDecorator;
