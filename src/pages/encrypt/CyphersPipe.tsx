import { useContext, useState } from 'react';
import zod from 'zod';

import { DynamicForm } from '@/components/DynamicForm';
import { RailFenceCypherOptions } from '@/features/cypher';

import { CiphersContext } from './CiphersContext';
import { CypherOptionsDef } from './types';

type PipeCfg = {
  [T in keyof CypherOptionsDef]: {
    serialize: (
      o: CypherOptionsDef[T] extends void ? void : CypherOptionsDef[T]
    ) => string;
    optionsSchema: CypherOptionsDef[T] extends void
      ? undefined
      : zod.ZodSchema<CypherOptionsDef[T]>;
  };
};

const pipeCfg: PipeCfg = {
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
};

const cypherRegister = ['mirror', 'railFence'] as const;

export function CyphersPipe() {
  const { selectedCyphers, addCypher } = useContext(CiphersContext);
  const [form, setForm] = useState<keyof PipeCfg>();
  const formSchema = form ? pipeCfg[form].optionsSchema : undefined;

  const handleAddCypher = (name: keyof PipeCfg) => {
    const cfg = pipeCfg[name];
    if (typeof cfg.optionsSchema === 'undefined') {
      return addCypher({ name } as any);
    }
    return setForm(name);
  };

  const handleFormSubmit = <
    T extends keyof CypherOptionsDef,
    K extends Exclude<CypherOptionsDef[T], void>
  >(
    name: T,
    opts: K
  ): void => {
    addCypher({ name, opts } as any);
    setForm(undefined);
  };

  const serializedCyphers = selectedCyphers.map((meta) =>
    pipeCfg[meta.name].serialize(meta.opts as any)
  );

  return (
    <div>
      <div>
        {cypherRegister.map((name) => (
          <button key={name} type="button" onClick={() => handleAddCypher(name)}>
            {name}
          </button>
        ))}
        {formSchema && form && (
          <DynamicForm schema={formSchema} onSubmit={(d) => handleFormSubmit(form, d)} />
        )}
      </div>
      <div>
        <h2>Pipe:</h2>
        {selectedCyphers.length > 0 ? (
          <ul>
            {serializedCyphers.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        ) : (
          <div>empty</div>
        )}
      </div>
    </div>
  );
}
