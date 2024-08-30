module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.(ts|tsx)?$': ['ts-jest', {
        tsconfig: 'tsconfig.app.json'
      }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx','json', 'node'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    //ignore any style 
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
      '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
  };
  