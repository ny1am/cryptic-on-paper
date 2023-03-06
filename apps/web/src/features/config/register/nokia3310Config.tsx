import { nokia3310CipherFactory, Nokia3310CipherOptions } from '@cop/ciphers';
import zod from 'zod';

import { ToggleInput } from '@/components/ToggleInput';

import { CipherConfig } from './types';

export const nokia3310Config: CipherConfig<Nokia3310CipherOptions> = {
  factory: nokia3310CipherFactory,
  form: {
    validationSchema: zod.object({
      throttle: zod.boolean(),
    }),
    defaultValues: {
      throttle: false,
    },
    uiFields: {
      throttle: {
        component: ToggleInput,
        props: {
          label: 'TODO:',
        },
      },
    },
  },
  meta: {
    description: {
      short: `TODO:`,
    },
  },
};
