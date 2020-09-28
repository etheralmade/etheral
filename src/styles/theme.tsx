import variants from './variants';
import text from './texts';
import buttons from './buttons';

export type Theme = {
    breakpoints: string[];
    fontSizes: number[] | string[];
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
    black: string[];
    misc: any;
};

const colors: ColorTheme = {
    blue: '#07c',
    lightGray: '#f6f6ff',
    brown: ['#E2DAD0', '#593614', '#B5967A', '#553517'],
    badges: [
        '#FF9292',
        '#9BEBA3',
        '#FEFEB2',
        '#ACDEF1',
        ' #ffc3b1',
        '#b19cd9',
        '#ffcccc',
    ],
    white: ['#FEFEFE', '#ddd', '#f9f9f9', '#eaeaea'],
    black: ['#222', '#aaa', '#24201F'],
    misc: {
        discount: '#f55',
    },
};

const theme: Theme = {
    //             432px   784px   1024px  1440px
    breakpoints: ['27em', '48em', '64em', '90em'],

    fontSizes: [
        '8pt', // 0
        '12pt', // 1
        '14pt', // 2
        '16pt', // 3
        '18pt', // 4
        '20pt', // 5
        '24pt', // 6
        '32pt', // 7
        '48pt', // 8
        '64pt', // 9
    ],
    colors,
    //         1, 2, 3, 4,  5,  6,  7,   8,  9, 10,  11
    space: [0, 4, 6, 8, 12, 16, 24, 32, 48, 64, 128, 256],
    fonts: {
        body: 'Poppins, sans-serif',
        heading: 'Poppins, sans-serif',
        monospace: 'Menlo, monospace',
        serif: 'Cormorant Garamond, serif',
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
