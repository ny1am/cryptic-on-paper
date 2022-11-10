import React from 'react';
import zod from 'zod';

import { Badge } from '@/components/Badge';
import { DynamicFormUIConfig } from '@/components/DynamicForm';
import { RangeInput } from '@/components/RangeInput';
import { TextInput } from '@/components/TextInput';
import { RailFenceDemo } from '@/features/demo';
import { ToggleCaseDemo } from '@/features/demo/toggleCase';

import { CipherKeyWhenRequiredOptions, CiphersOptionsRegister } from '../config';

export type FormType<T extends CipherKeyWhenRequiredOptions> = {
  validationSchema: zod.ZodSchema<CiphersOptionsRegister[T]>;
  uiFields: DynamicFormUIConfig<CiphersOptionsRegister[T]>;
  defaultValues: CiphersOptionsRegister[T];
};

type PipeCfg = {
  [T in keyof CiphersOptionsRegister]: {
    form: T extends CipherKeyWhenRequiredOptions ? FormType<T> : undefined;
    meta: {
      description: {
        short: string;
        long?: JSX.Element;
      };
      demo?: React.FC<Partial<CiphersOptionsRegister[T]>>;
    };
  };
};

export const pipeCfg: PipeCfg = {
  'Reverse': {
    form: undefined,
    meta: {
      description: {
        short: `Transposition cipher. Reverses text.`,
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
            <p>
              <Badge>depth</Badge> - number of rails
            </p>
          </>
        ),
      },
      demo: ({ depth }) => <RailFenceDemo depth={depth || 4} />,
    },
  },
  'Caesar': {
    form: {
      validationSchema: zod.object({
        shift: zod.number().min(1).max(25),
      }),
      defaultValues: {
        shift: 1,
      },
      uiFields: {
        shift: {
          component: RangeInput,
          valueAsNumber: true,
          props: { min: 1, max: 25 },
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
              For example, with a right shift of 3, A would be replaced by D, B would
              become E, and so on.
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
            <p>
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

export function areCipherOptionsRequired(
  key: keyof CiphersOptionsRegister
): key is CipherKeyWhenRequiredOptions {
  return typeof pipeCfg[key].form !== 'undefined';
}
