import variants from './variants';
import text from './texts';
import buttons from './buttons';

export type Theme = {
    breakpoints: string[];
    fontSizes: number[];
    colors: ColorTheme;
    space: number[];
    fonts: {
        body: string;
        heading: string;
        monospace: string;
        serif: string;
    };
    fontWeights: {
        body: number;
        medium: number;
        heading: number;
        bold: number;
    };
    lineHeights: {
        body: number;
        heading: number;
    };
    shadows: {
        small: string;
        large: string;
    };
    variants: any; // add more on development
    text: any; // same as variants
    buttons: any;
};

export type ColorTheme = {
    blue: string;
    lightGray: string;
    brown: string[];
    badges: string[];
    white: string[];
};

const colors: ColorTheme = {
    blue: '#07c',
    lightGray: '#f6f6ff',
    brown: ['#E2DAD0', '#593614', '#C8B8A9', '#553517'],
    badges: ['#FF9292', '#9BEBA3'],
    white: ['#FEFEFE', '#ddd'],
};

const theme: Theme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors,
    space: [0, 4, 6, 8, 12, 16, 24, 32, 64, 128, 256],
    fonts: {
        body: "'Montserrat', sans-serif",
        heading: "'Raleway', sans-serif",
        monospace: 'Menlo, monospace',
        serif: "'Cormorant Garamond', serif",
    },
    fontWeights: {
        body: 400,
        medium: 500,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)',
    },
    variants,
    text,
    buttons,
};

export { theme };
