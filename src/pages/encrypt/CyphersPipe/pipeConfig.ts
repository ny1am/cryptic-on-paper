import zod from 'zod';

import { RailFenceCypherOptions } from '@/features/cypher';

import { CypherKeysWithRequiredOptions, CyphersOptionsRegister } from '../config';

export type FormSchemaType<T extends CypherKeysWithRequiredOptions> = zod.ZodSchema<
  CyphersOptionsRegister[T]
>;

type PipeCfg = {
  [T in keyof CyphersOptionsRegister]: {
    serialize: (
      o: T extends CypherKeysWithRequiredOptions ? CyphersOptionsRegister[T] : undefined
    ) => string;
    optionsSchema: T extends CypherKeysWithRequiredOptions
      ? FormSchemaType<T>
      : undefined;
  };
};

export const pipeCfg: PipeCfg = {
  mirror: {
    serialize: () => 'mirror',
    optionsSchema: undefined,
  },
  railFence: {
    serialize: (opts: RailFenceCypherOptions) => `railFence (depth: ${opts.depth})`,
    optionsSchema: zod.object({
      depth: zod.number().min(1).max(5),
    }),
  },
  toggleCase: {
    serialize: () => `todo`,
    optionsSchema: zod.object({
      include: zod.string().optional(),
    }),
  },
};

export function areCypherOptionsRequired(
  key: keyof CyphersOptionsRegister
): key is CypherKeysWithRequiredOptions {
  return typeof pipeCfg[key].optionsSchema !== 'undefined';
}
