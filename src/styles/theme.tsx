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
    buttons: ButtonVariants;
};

export type ColorTheme = {
    blue: string;
    lightGray: string;
    brown: string[];
};

type ButtonVariants = {
    adminLink: any;
    adminLinkActive: any;
};

const colors: ColorTheme = {
    blue: '#07c',
    lightGray: '#f6f6ff',
    brown: ['#E2DAD0', '#CAB8AA'],
};

const buttons: ButtonVariants = {
    adminLink: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        transition: '0.2s',
        width: '100%',
        color: 'brown.1',
        bg: '#fff',
        textAlign: 'left',
        outline: 'none',
        '&: hover': {
            color: 'brown.0',
            bg: 'brown.1',
        },
        '& > svg': {
            mr: [2],
        },
        borderRadius: 0,
    },
    adminLinkActive: {
        fontFamily: 'heading',
        transition: '0.2s',
        width: '100%',
        fontWeight: 'bold',
        color: '#fff',
        bg: 'brown.1',
        textAlign: 'left',
        outline: 'none',
        '& > svg': {
            mr: [2],
        },
        borderRadius: 0,
    },
};

const theme: Theme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors,
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fonts: {
        body: "'Montserrat', sans-serif",
        heading: "'Raleway', sans-serif",
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
    buttons,
};

export { theme };
