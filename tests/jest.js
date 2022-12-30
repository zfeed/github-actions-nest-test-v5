module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '(/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    setupFilesAfterEnv: ['jest-extended/all'],
    testEnvironment: 'node'
};
