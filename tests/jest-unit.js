const baseConfig = require('./jest');

const config = {
    rootDir: 'unit'
};

module.exports = { ...baseConfig, ...config };
