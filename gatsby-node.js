exports.modifyBabelrc = ({ babelrc }) => ({
    ...babelrc,
    ...(process.env.NODE_ENV !== 'development' && {
        plugins: babelrc.plugins.concat([
            'transform-regenerator',
            'transform-runtime',
        ]),
    }),
});
