const buttonBaseStyle = {
    fontFamily: 'body',
    outline: 'none',
    borderRadius: 0,
    whiteSpace: 'nowrap',
    '&: hover': {
        cursor: 'pointer',
    },
};

const buttonAdminLinkStyle = {
    ...buttonBaseStyle,
    fontFamily: 'heading',
    fontWeight: 'body',
    fontSize: [1, 1, 2],
    transition: '0.2s',
    width: ['25%', '25%', '100%'],
    textAlign: 'left',
    display: ['flex', 'flex', 'block'],
    alignItems: ['center', 'center', 'unset'],
    justifyContent: ['center', 'center', 'unset'],
    py: [4],
    pl: [4, 4, 7],
    pr: [4, 4, 9],
    bg: '#333',
    '&: hover': {
        color: '#fff',
        cursor: 'pointer',
    },
    '& > svg': {
        mr: [0, 0, 6],
        transform: ['scale(1.6) !important', 'scale(1.6) !important', ''],
    },
};

export default {
    adminLink: {
        ...buttonAdminLinkStyle,
        color: 'brown.0',
    },
    adminLinkActive: {
        ...buttonAdminLinkStyle,
        color: '#fff',
        fontWeight: 'bold',
        bg: '#222',
    },
    primary: {
        ...buttonBaseStyle,
        bg: 'black.2',
        color: 'white.0',
        fontFamily: 'body',
        fontWeight: 600,
        fontSize: [0, 0, 1],
    },
    secondary: {
        ...buttonBaseStyle,
        bg: 'brown.2',
        color: 'brown.3',
        fontFamily: 'body',
        fontWeight: 600,
        fontSize: [0, 0, 1],
    },
};
