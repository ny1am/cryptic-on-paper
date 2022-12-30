import { caesarCipherFactory, CaesarCipherOptions } from '@cop/ciphers';
import zod from 'zod';

import { Badge } from '@/components/Badge';
import { StepperInput } from '@/components/StepperInput';
import { CaesarDemo } from '@/features/demo';

import { CipherConfig } from './types';

export const caesarConfig: CipherConfig<CaesarCipherOptions> = {
  factory: caesarCipherFactory,
  form: {
    validationSchema: zod.object({
      shift: zod.number({ invalid_type_error: 'Invalid number' }).min(1).max(25),
    }),
    defaultValues: {
      shift: 1,
    },
    uiFields: {
      shift: {
        component: StepperInput,
        label: `shift [1-25]`,
        valueAsNumber: true,
        props: { min: 1, max: 25, step: 1 },
      },
    },
  },
  meta: {
    description: {
      short:
        'Substitution cipher. Each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.',
      long: (
        <>
          <p>
            In the caesar cipher, each letter in the plaintext is replaced by a letter
            some fixed number of positions down the alphabet.
          </p>
          <p>
            For example, with a right shift of 3, A would be replaced by D, B would become
            E, and so on.
          </p>
          <p>
            The method is named after Julius Caesar, who used it in his private
            correspondence.
          </p>
          <p>
            <Badge>shift</Badge> - right shift of the alphabet
          </p>
        </>
      ),
    },
    demo: ({ shift }) => <CaesarDemo shift={shift || 0} />,
  },
};
