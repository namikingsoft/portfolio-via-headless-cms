/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>test/check-assertions-number.ts'],
}