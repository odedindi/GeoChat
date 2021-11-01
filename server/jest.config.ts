import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	bail: 1,
	roots: ['<rootDir>/src'],
	testMatch: ['**/_tests_/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
};
export default config;
