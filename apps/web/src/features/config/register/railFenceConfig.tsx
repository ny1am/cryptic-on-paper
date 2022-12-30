import { railFenceCipherFactory, RailFenceCipherOptions } from '@cop/ciphers';
import zod from 'zod';

import { Badge } from '@/components/Badge';
import { RangeInput } from '@/components/RangeInput';
import { RailFenceDemo } from '@/features/demo';

import { CipherConfig } from './types';

export const railFenceConfig: CipherConfig<RailFenceCipherOptions> = {
  factory: railFenceCipherFactory,
  form: {
    validationSchema: zod.object({
      height: zod.number().min(2).max(6),
    }),
    defaultValues: {
      height: 4,
    },
    uiFields: {
      height: {
        component: RangeInput,
        valueAsNumber: true,
        props: { min: 2, max: 6 },
      },
    },
  },
  meta: {
    description: {
      short: `Transposition cipher. It derives its name from the manner in which encryption is performed, in analogy to a fence built with horizontal rails.`,
      long: (
        <>
          <p>
            In the rail fence cipher, the plaintext is written downwards diagonally on
            successive &quot;rails&quot; of an imaginary fence, then moving up when the
            bottom rail is reached, down again when the top rail is reached, and so on
            until the whole plaintext is written out.
          </p>
          <p>The ciphertext is then read off in rows.</p>
          <p>
            <Badge>height</Badge> - number of rails
          </p>
        </>
      ),
    },
    demo: ({ height }) => <RailFenceDemo height={height ?? 4} />,
  },
};
