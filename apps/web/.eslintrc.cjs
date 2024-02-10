const restrictedLibs = [
  { original: '@formkit/auto-animate', replacement: '@/libs/auto-animate' },
  { original: '@headlessui', replacement: '@/libs/headlessui' },
];

module.exports = {
  extends: [
    '../../.eslintrc.cjs',
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: { version: 'detect' },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['!src/lib/**/*'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: restrictedLibs.map((lib) => ({
              group: [`${lib.original}*`],
              message: `Please import from "${lib.replacement}" instead.`,
            })),
          },
        ],
      },
    },
  ],
};
