const baseLink = {
    fontFamily: 'body',
    fontSize: [2, 2, 1],
    fontWeight: 'regular',
    mr: [0, 0, 5],
    transition: '0.2s, font-weight .4s ease-out',
    my: [4],
    width: [128],
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
    statusBadgeUpdate: {
        ...statusBadge,
        color: '#000',
        bg: 'badges.5',
    },
    statusBadgeNew: { ...statusBadge, color: '#000', bg: 'badges.6' },
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
    },
    productName: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        fontSize: [1, 2, 1, 2],
    },
    productPageName: {
        fontFamily: 'heading',
        fontWeight: 'heading',
        fontSize: [2, 2, 3],
    },
    productPageHeading: {
        fontFamily: 'heading',
        fontWeight: 'medium',
        fontSize: [1, 1, 2],
    },
    productPageBody: {
        fontFamily: 'heading',
        fontWeight: 'body',
        fontSize: [1, 1, 2],
    },
};

const blog = {
    blogTitle: {
        fontFamily: 'heading',
        fontWeight: 500,
        fontSize: [3, 3, 4],
        color: 'black.0',
    },
    blogDate: {
        fontFamily: 'body',
        fontWeight: 'body',
        fontSize: [2, 2, 3],
        color: 'black.1',
    },
};

const forms = {
    formError: {
        ...productCard.productPrice,
        fontSize: [1],
        color: 'misc.discount',
    },
    formHeading: {
        fontFamily: 'heading',
        fontWeight: 'semiBold',
        fontSize: [1, 1, 2],
    },
    formLabel: {
        fontFamily: 'heading',
        fontWeight: 'semiBold',
        fontSize: [10, 10, 10],
        mb: [3],
        mt: [5],
    },
};

export default {
    h1: {
        fontSize: [3, 3, 4],
        fontFamily: 'heading',
        fontWeight: 'bold',
    },

    h2: {
        fontFamily: 'heading',
        fontWeight: 'body',
        fontSize: [2, 2, 3, 4],
    },
    h3: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        fontSize: [3, 3, 4],
        color: 'black.0',
    },
    h4: {
        color: '#000',
        fontSize: [1, 1, 2],
        fontWeight: 'semiBold',
        fontFamily: 'heading',
    },
    h5: {
        fontSize: ['10px', '10px', '12px'],
        fontFamily: 'heading',
        fontWeight: 'bold',
    },
    body: {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        fontWeight: 'body',
    },
    bodyMedium: {
        fontFamily: 'body',
        fontWeight: 'medium',
    },
    tileText: {
        fontFamily: 'heading',
        fontWeight: 300,
        textDecoration: 'none',
        color: '#fff',
        fontSize: [24, 24, 24, 32, 40],
        letterSpacing: [8],
        textAlign: 'center',
    },
    ...links,
    ...productCard,
    ...badges,
    ...admin,
    ...blog,
    ...forms,
};
