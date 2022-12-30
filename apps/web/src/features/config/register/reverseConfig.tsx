import { reverseCipherFactory } from '@cop/ciphers';

import { CipherConfig } from './types';

export const reverseConfig: CipherConfig<void> = {
  factory: reverseCipherFactory,
  form: undefined,
  meta: {
    description: {
      short: `Transposition cipher. Reverses text.`,
    },
  },
};
