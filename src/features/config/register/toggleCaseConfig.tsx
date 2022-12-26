import zod from 'zod';

import { Badge } from '@/components/Badge';
import { TextInput } from '@/components/TextInput';
import { toggleCaseCipherFactory, ToggleCaseCipherOptions } from '@/features/cipher';
import { ToggleCaseDemo } from '@/features/demo';

import { CipherConfig } from './types';

export const toggleCaseConfig: CipherConfig<ToggleCaseCipherOptions> = {
  factory: toggleCaseCipherFactory,
  form: {
    validationSchema: zod.object({
      include: zod.string().max(20).optional(),
    }),
    defaultValues: {
      include: '',
    },
    uiFields: {
      include: {
        component: TextInput,
        props: { maxLength: 20 },
      },
    },
  },
  meta: {
    description: {
      short: `Substitution cipher. Toggles letter case of input characters.`,
      long: (
        <>
          <p>Toggles letter case of input characters.</p>
          <p>
            <Badge>include</Badge> (optional) - toggle case only applies to the specified
            characters regardless of letter case
          </p>
        </>
      ),
    },
    demo: ({ include }) => <ToggleCaseDemo include={include} />,
  },
};
