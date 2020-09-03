const badgeStyle = {
    fontSize: [1, 1, 2],
    fontFamily: 'body',
    color: '#fff',
    p: 2,
    display: 'inline-block',
    '& > svg': {
        mr: 2,
    },
};

export default {
    paidBadge: {
        ...badgeStyle,
        bg: 'badges.1',
    },
    notPaidBadge: {
        ...badgeStyle,
        bg: 'badges.0',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
};
