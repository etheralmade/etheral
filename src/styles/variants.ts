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

const baseInput = {
    border: 'none',
};

const flexCenterBase = {
    justifyContent: 'center',
    alignItems: 'center',
};

const inputs = {
    textInput: {
        ...baseInput,
        fontFamily: 'Poppins, sans-serif',
        mb: [3, 0],
        mr: [0, 3],
        background: 'none',
        borderBottom: '4px solid #333',
        fontSize: [0, 0, 1],
        px: [0, 3, 7],
        py: [0, 3],
        width: ['calc(100% + 16px)', 'calc(100% + 16px)', 'calc(100% + 64px)'],
    },
};

export default {
    // wrapper styles
    outerWrapper: {
        ...flexCenterBase,
        width: '100%',
        my: [5, 5, 6],
    },
    innerWrapper: {
        maxWidth: ['100%', '38em', '62em', '90%'],
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
    ...inputs,
};
