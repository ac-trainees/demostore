module.exports = {
    name: 'dcp-commerce-ui',
    moduleNameMapper: {
      '@core/(.*)': '<rootDir>/src/app/core/$1',
      '^lodash-es$': 'lodash'
    },
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageReporters: ['text', 'text-summary', 'json', 'html', 'lcov'],
    coverageDirectory: './dist/coverage/',
    'collectCoverageFrom': [
      'src/**/!(*.spec|*.module).{ts,js}'
    ],
    moduleDirectories: ['node_modules', 'src', 'tests'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    reporters: [
      'default',
      ['jest-junit', {outputDirectory: './dist/reports/unit/'}]
    ],
    testResultsProcessor: 'jest-sonar-reporter'
  };