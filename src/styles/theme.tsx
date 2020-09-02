// TODO: add theming!
export type Theme = {
    breakpoints: string[];
    fontSizes: number[];
    colors: ColorTheme;
    space: number[];
    fonts: {
        body: string;
        heading: string;
        monospace: string;
    };
    fontWeights: {
        body: number;
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
};

export type ColorTheme = {
    blue: string;
    lightGray: string;
};

const colors: ColorTheme = {
    blue: '#07c',
    lightGray: '#f6f6ff',
};

const theme: Theme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors,
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontWeights: {
        body: 400,
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
    variants: {},
    text: {},
    // buttons: {
    //     primary: {
    //         color: 'white',
    //         bg: 'primary',
    //     },
    // },
};

export { theme };
