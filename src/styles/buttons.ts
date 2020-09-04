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
    py: [4, 4, 2],
    px: [4, 4, 7],
    bg: 'brown.0',
    '&: hover': {
        color: 'brown.3',
        cursor: 'pointer',
    },
    '& > svg': {
        mr: [0, 0, 4],
        transform: ['scale(1.6) !important', 'scale(1.6) !important', ''],
    },
};

export default {
    adminLink: {
        ...buttonAdminLinkStyle,
        color: 'brown.2',
    },
    adminLinkActive: {
        ...buttonAdminLinkStyle,
        color: 'brown.3',
        fontWeight: 'bold',
    },
    primary: {
        ...buttonBaseStyle,
        bg: 'brown.0',
        color: 'brown.3',
        fontFamily: 'heading',
        fontWeight: 'heading',
        fontSize: [0, 0, 1],
    },
};
