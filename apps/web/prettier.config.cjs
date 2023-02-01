const rootConfig = require('../../prettier.config.cjs');

module.exports = {
  ...rootConfig,
  plugins: [
    ...(rootConfig.plugins ?? []),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
};
