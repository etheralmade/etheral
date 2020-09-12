const baseLink = {
    fontFamily: 'body',
    fontSize: [3, 3, 1],
    fontWeight: 'medium',
    mr: [0, 0, 5],
};

const linkActiveAttrs = {
    fontWeight: 'bold',
};

export default {
    h1: {
        fontSize: [5, 5, 6],
    },
    headingAdmin: {
        fontSize: [5],
        fontFamily: 'serif',
        fontWeight: 600,
        fontStyle: 'italic',
        color: 'brown.2',
    },
    adminOrderHeading: {
        fontSize: [3],
        fontFamily: 'body',
        fontWeight: 'body',
    },
    adminOrderBody: {
        fontSize: [2],
        fontFamily: 'body',
        fontWeight: 600,
        color: 'brown.1',
    },
    h2: {
        fontFamily: 'heading',
        fontWeight: 'heading',
        fontSize: [4, 4, 5],
    },
    h3: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        fontSize: [3, 3, 4],
        color: 'brown.3',
    },
    h4: {
        color: '#000',
        fontSize: [3, 3, 4],
    },
    h5: {
        fontSize: [2, 2, 3],
    },
    body: {
        fontFamily: 'body',
    },
    bodyMedium: {
        fontFamily: 'body',
        fontWeight: 'medium',
    },
    tileText: {
        fontFamily: 'heading',
        fontWeight: 400,
        textDecoration: 'none',
        color: '#fff',
    },
    productPrice: {
        fontFamily: 'body',
        fontWeight: 500,
        fontSize: [1, 2, 1, 2],
        color: '#000',
    },
    productName: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        fontSize: [1, 2, 1, 2],
        color: '#000',
    },
    link: {
        ...baseLink,
        color: '#555',
        transition: '0.2s',
        '&:hover': {
            ...linkActiveAttrs,
            fontWeight: 'body',
        },
    },
    linkWhite: {
        ...baseLink,
        color: '#555',
        transition: '0.2s',
        '&:hover': {
            ...linkActiveAttrs,
            fontWeight: 'body',
        },
    },
    linkSmall: {
        ...baseLink,
        color: '#555',
        transition: '0.2s',
        fontSize: [1],
        '&:hover': {
            ...linkActiveAttrs,
            fontWeight: 'body',
        },
    },
    linkActive: {
        ...baseLink,
        ...linkActiveAttrs,
    },
};
