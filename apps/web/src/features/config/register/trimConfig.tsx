import { trimCipherFactory, TrimCipherOptions } from '@cop/ciphers';
import zod from 'zod';

import { StepperInput } from '@/components/StepperInput';
import { TrimDemo } from '@/features/demo';

import { CipherConfig } from './types';

export const trimConfig: CipherConfig<TrimCipherOptions> = {
  factory: trimCipherFactory,
  form: {
    validationSchema: zod.object({
      length: zod.number({ invalid_type_error: 'Invalid number' }).min(0),
    }),
    defaultValues: {
      length: 16,
    },
    uiFields: {
      length: {
        component: StepperInput,
        valueAsNumber: true,
        props: { maxLength: 5 },
      },
    },
  },
  meta: {
    description: {
      short: `Utility function to restrict a resulting number of characters.`,
    },
    demo: ({ length }) => (
      <TrimDemo length={length ?? trimConfig.form.defaultValues.length} />
    ),
  },
};
