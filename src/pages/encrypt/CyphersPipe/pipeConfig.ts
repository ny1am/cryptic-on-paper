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
  };
};

export const pipeCfg: PipeCfg = {
  'Mirror': {
    optionsSchema: undefined,
    uiConfig: undefined,
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
  },
};

export function areCypherOptionsRequired(
  key: keyof CyphersOptionsRegister
): key is CypherKeyWhenRequiredOptions {
  return typeof pipeCfg[key].optionsSchema !== 'undefined';
}
