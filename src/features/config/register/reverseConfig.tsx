import { reverseCipherFactory } from '@/features/cipher';

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
