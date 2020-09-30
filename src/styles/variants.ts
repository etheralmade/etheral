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
    fontFamily: 'Poppins, sans-serif',
    background: 'none',
};

const flexCenterBase = {
    justifyContent: 'center',
    alignItems: 'center',
};

const inputs = {
    textInput: {
        ...baseInput,
        mb: [3, 0],
        mr: [0, 3],
        borderBottom: '4px solid #333',
        fontSize: [1],
        px: [0, 3, 7],
        py: [0, 3],
        width: ['calc(100%)', 'calc(100% + 16px)', 'calc(100% + 64px)'],
    },
    authInput: {
        ...baseInput,
        fontSize: [10],
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black.0',
        px: [3],
        py: [2],
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
