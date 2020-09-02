const buttonAdminLinkStyle = {
    fontFamily: 'heading',
    fontWeight: 'medium',
    fontSize: [2, 2, 3],
    transition: '0.2s',
    width: '100%',
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
};
