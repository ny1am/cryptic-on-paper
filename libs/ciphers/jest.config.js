import { pathsToModuleNameMapper } from 'ts-jest';

import cfg from './tsconfig.json' assert { type: 'json' };

export default {
  preset: 'ts-jest',
  verbose: false,
  moduleNameMapper: pathsToModuleNameMapper(cfg.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
