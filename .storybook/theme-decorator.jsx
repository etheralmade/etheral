import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import { theme, GlobalStyles } from '../src/styles';
import useFonts from '../src/helper/use-fonts';

const ThemeDecorator = storyFn => {
    useFonts();

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
        </>
    );
};
export default ThemeDecorator;
