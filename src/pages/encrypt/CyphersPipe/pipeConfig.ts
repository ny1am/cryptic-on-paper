import zod from 'zod';

import { DynamicFormUIConfig } from '@/components/DynamicForm';
import { RangeInput } from '@/components/RangeInput';
import { TextInput } from '@/components/TextInput';

import { CypherKeyWhenRequiredOptions, CyphersOptionsRegister } from '../config';

export type FormSchemaType<T extends CypherKeyWhenRequiredOptions> = zod.ZodSchema<
  CyphersOptionsRegister[T]
>;

type PipeCfg = {
  [T in keyof CyphersOptionsRegister]: {
    optionsSchema: T extends CypherKeyWhenRequiredOptions ? FormSchemaType<T> : undefined;
    uiConfig: T extends CypherKeyWhenRequiredOptions
      ? DynamicFormUIConfig<CyphersOptionsRegister[T]>
      : undefined;
    meta: {
      description: {
        short: string;
        long?: string;
      };
    };
  };
};

export const pipeCfg: PipeCfg = {
  'Mirror': {
    optionsSchema: undefined,
    uiConfig: undefined,
    meta: {
      description: {
        short: `Transposition cipher. Mirrors input from right to left.`,
      },
    },
  },
  'Rail fence': {
    optionsSchema: zod.object({
      depth: zod.number().min(2).max(6),
    }),
    uiConfig: {
      depth: {
        component: RangeInput,
        valueAsNumber: true,
        props: { min: 2, max: 6, defaultValue: 4 },
      },
    },
    meta: {
      description: {
        short: `Transposition cipher. It derives its name from the manner in which encryption is performed, in analogy to a fence built with horizontal rails.`,
        long: `In the rail fence cipher, the plaintext is written downwards diagonally on successive "rails" of an imaginary fence, then moving up when the bottom rail is reached, down again when the top rail is reached, and so on until the whole plaintext is written out. The ciphertext is then read off in rows.`,
      },
    },
  },
  'Toggle case': {
    optionsSchema: zod.object({
      include: zod.string().max(20).optional(),
    }),
    uiConfig: {
      include: {
        component: TextInput,
        props: { maxLength: 20 },
      },
    },
    meta: {
      description: {
        short: `Substitution cipher. Toggles letter case of input characters.`,
      },
    },
  },
};

export function areCypherOptionsRequired(
  key: keyof CyphersOptionsRegister
): key is CypherKeyWhenRequiredOptions {
  return typeof pipeCfg[key].optionsSchema !== 'undefined';
}
