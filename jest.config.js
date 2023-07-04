const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})


const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{jsx,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
}

module.exports = createJestConfig(customJestConfig)