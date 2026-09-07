import { pathsToModuleNameMapper } from 'ts-jest';

import cfg from './tsconfig.json' with { type: 'json' };

export default {
  preset: 'ts-jest',
  verbose: false,
  moduleNameMapper: pathsToModuleNameMapper(cfg.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
