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

const flexCenterBase = {
    justifyContent: 'center',
    alignItems: 'center',
};

export default {
    // wrapper styles
    outerWrapper: {
        ...flexCenterBase,
        width: '100%',
        my: [7, 7, 8],
    },
    innerWrapper: {
        maxWidth: ['100%', '38em', '62em', '80%'],
        width: '100%',
        px: ['5%', '5%'],
    },
    center: flexCenterBase,

    // badge styles
    paidBadge: {
        ...badgeStyle,
        bg: 'badges.1',
    },
    notPaidBadge: {
        ...badgeStyle,
        bg: 'badges.0',
    },
};
