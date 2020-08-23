const firebaseApp = require('./src/lib/firebase');

exports.modifyBabelrc = ({ babelrc }) => ({
    ...babelrc,
    // ...(process.env.NODE_ENV !== 'development' && {
    //     plugins: babelrc.plugins.concat([
    //         'transform-regenerator',
    //         'transform-runtime',
    //     ]),
    // }),
    plugins: babelrc.plugins.concat([
        'transform-regenerator',
        'transform-runtime',
    ]),
});

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
};
