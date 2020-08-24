module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': '<rootDir>/jest-preprocess.ts',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/file-mock.js',
        'src/(.*)': '<rootDir>/src/$1',
        'tests/(.*)': '<rootDir>/__tests__/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['node_modules', '.cache'],
    transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
    globals: {
        __PATH_PREFIX__: '',
    },
    testURL: 'http://localhost',
    setupFiles: ['<rootDir>/jest-loadershim.ts'],
    moduleDirectories: ['node_modules', 'src'],
};
