import next from 'eslint-config-next/core-web-vitals';

import { baseConfig, prettierConfig } from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...next,
  {
    // eslint-plugin-react's React-version auto-detection uses APIs removed in
    // ESLint 10, so pin the version to skip it.
    settings: { react: { version: '19.2' } },
  },
  ...prettierConfig,
];
