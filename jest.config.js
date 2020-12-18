module.exports = {
  modulePaths: [
    'node_modules',
    'public',
    'components',
  ],
  moduleDirectories: [
    'node_modules',
    'public',
    'components',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^public(.*)$': '<rootDir>/public$1',
    '^context(.*)$': '<rootDir>/context$1',
  },
};
