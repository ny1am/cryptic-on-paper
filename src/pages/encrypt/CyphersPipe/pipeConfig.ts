import zod from 'zod';

import { CypherKeyWhenRequiredOptions, CyphersOptionsRegister } from '../config';

export type FormSchemaType<T extends CypherKeyWhenRequiredOptions> = zod.ZodSchema<
  CyphersOptionsRegister[T]
>;

type PipeCfg = {
  [T in keyof CyphersOptionsRegister]: {
    optionsSchema: T extends CypherKeyWhenRequiredOptions ? FormSchemaType<T> : undefined;
  };
};

export const pipeCfg: PipeCfg = {
  'Mirror': {
    optionsSchema: undefined,
  },
  'Rail fence': {
    optionsSchema: zod.object({
      depth: zod.number().min(1).max(5),
    }),
  },
  'Toggle case': {
    optionsSchema: zod.object({
      include: zod.string().max(20).optional(),
    }),
  },
};

export function areCypherOptionsRequired(
  key: keyof CyphersOptionsRegister
): key is CypherKeyWhenRequiredOptions {
  return typeof pipeCfg[key].optionsSchema !== 'undefined';
}
