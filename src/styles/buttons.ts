const buttonBaseStyle = {
    fontFamily: 'body',
    outline: 'none',
    borderRadius: 0,
    '&: hover': {
        cursor: 'pointer',
    },
};

const buttonAdminLinkStyle = {
    ...buttonBaseStyle,
    fontFamily: 'heading',
    fontWeight: 'medium',
    fontSize: [2, 2, 3],
    transition: '0.2s',
    width: '100%',
    textAlign: 'left',
    '&: hover': {
        color: 'brown.0',
        bg: 'brown.1',
        cursor: 'pointer',
    },
    '& > svg': {
        mr: [2],
    },
};

export default {
    adminLink: {
        ...buttonAdminLinkStyle,
        color: 'brown.1',
        bg: '#fff',
    },
    adminLinkActive: {
        ...buttonAdminLinkStyle,
        color: '#fff',
        bg: 'brown.1',
    },
    primary: {
        ...buttonBaseStyle,
        bg: 'brown.2',
        color: '#fff',
    },
};
