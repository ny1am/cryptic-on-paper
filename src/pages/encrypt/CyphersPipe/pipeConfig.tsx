import React from 'react';
import zod from 'zod';

import { Badge } from '@/components/Badge';
import { DynamicFormUIConfig } from '@/components/DynamicForm';
import { RangeInput } from '@/components/RangeInput';
import { TextInput } from '@/components/TextInput';
import { RailFenceDemo } from '@/features/demo';
import { ToggleCaseDemo } from '@/features/demo/toggleCase';

import { CypherKeyWhenRequiredOptions, CyphersOptionsRegister } from '../config';

export type FormType<T extends CypherKeyWhenRequiredOptions> = {
  validationSchema: zod.ZodSchema<CyphersOptionsRegister[T]>;
  uiFields: DynamicFormUIConfig<CyphersOptionsRegister[T]>;
  defaultValues: CyphersOptionsRegister[T];
};

type PipeCfg = {
  [T in keyof CyphersOptionsRegister]: {
    form: T extends CypherKeyWhenRequiredOptions ? FormType<T> : undefined;
    meta: {
      description: {
        short: string;
        long?: JSX.Element;
      };
      demo?: React.FC<Partial<CyphersOptionsRegister[T]>>;
    };
  };
};

export const pipeCfg: PipeCfg = {
  'Mirror': {
    form: undefined,
    meta: {
      description: {
        short: `Transposition cipher. Mirrors input from right to left.`,
      },
    },
  },
  'Rail fence': {
    form: {
      validationSchema: zod.object({
        depth: zod.number().min(2).max(6),
      }),
      defaultValues: {
        depth: 4,
      },
      uiFields: {
        depth: {
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
            <p className="mt-2">
              <Badge>depth</Badge> - number of rails
            </p>
          </>
        ),
      },
      demo: ({ depth }) => <RailFenceDemo depth={depth || 4} />,
    },
  },
  'Toggle case': {
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
            <p className="mt-2">
              <Badge>include</Badge> (optional) - toggle case is only applied to specified
              characters regardless of letter case
            </p>
          </>
        ),
      },
      demo: ({ include }) => <ToggleCaseDemo include={include} />,
    },
  },
};

export function areCypherOptionsRequired(
  key: keyof CyphersOptionsRegister
): key is CypherKeyWhenRequiredOptions {
  return typeof pipeCfg[key].form !== 'undefined';
}
