const badgeStyle = {
    fontSize: [2, 2, 3],
    fontFamily: 'body',
    color: '#fff',
    p: 2,
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
