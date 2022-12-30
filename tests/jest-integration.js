const baseConfig = require('./jest');

const config = {
    rootDir: 'integration',
    setupFiles: ['dotenv/config'],
    testTimeout: 20000000
};

module.exports = { ...baseConfig, ...config };
