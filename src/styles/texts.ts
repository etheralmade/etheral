const baseLink = {
    fontFamily: 'body',
    fontSize: [3, 3, 1],
    fontWeight: 'medium',
    mr: [0, 0, 5],
    transition: '0.2s, font-weight .4s ease-out',
};

const linkActiveAttrs = {
    fontWeight: 'bold',
};

const statusBadge = {
    fontFamily: 'body',
    fontSize: [0],
    px: [2],
    py: [1],
    fontWeight: 'bold',
    color: '#fff',
    width: 'fit-content',
};

const badges = {
    statusBadgePaid: {
        ...statusBadge,
        bg: 'badges.1',
    },
    statusBadgeNotPaid: {
        ...statusBadge,
        bg: 'badges.0',
    },
    statusBadgeShipped: {
        ...statusBadge,
        bg: 'badges.3',
        color: '#444',
    },
    statusBadgeNotShipped: {
        ...statusBadge,
        bg: 'badges.2',
        color: '#444',
    },
    statusBadgeDate: {
        ...statusBadge,
        color: '#000',
        bg: 'badges.4',
    },
};

const links = {
    link: {
        ...baseLink,
        color: '#555',
        '&:hover': {
            ...linkActiveAttrs,
        },
    },
    linkWhite: {
        ...baseLink,
        color: '#555',
        '&:hover': {
            ...linkActiveAttrs,
        },
    },
    linkSmall: {
        ...baseLink,
        color: '#555',
        fontSize: [1],
        '&:hover': {
            ...linkActiveAttrs,
        },
    },
    linkActive: {
        ...baseLink,
        ...linkActiveAttrs,
    },
};

const admin = {
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
        fontWeight: 'bold',
        color: 'black.0',
        mb: [3],
    },
};

const productCard = {
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
};

export default {
    h1: {
        fontSize: [5, 5, 6],
    },

    h2: {
        fontFamily: 'heading',
        fontWeight: 'heading',
        fontSize: [3, 3, 4],
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
        fontSize: [0, 0, 1],
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
    ...links,
    ...productCard,
    ...badges,
    ...admin,
};
