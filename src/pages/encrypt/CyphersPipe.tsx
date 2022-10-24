import { useContext, useState } from 'react';
import zod from 'zod';

import { DynamicForm } from '@/components/DynamicForm';
import { RailFenceCypherOptions } from '@/features/cypher';
import { FilterOutVoid } from '@/utils/types';

import { CiphersContext } from './CiphersContext';
import { CypherMeta, CypherOptionsDef } from './types';

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

export function CyphersPipe() {
  const { selectedCyphers, addCypher } = useContext(CiphersContext);
  const [form, setForm] = useState<keyof PipeCfg>();
  const formSchema = form ? pipeCfg[form].optionsSchema : undefined;

  const handleAddCypher = (name: CypherMeta['name']) => {
    const cfg = pipeCfg[name];
    if (typeof cfg.optionsSchema === 'undefined') {
      return addCypher({ name } as any);
    }
    return setForm(name);
  };

  const handleFormSubmit = <
    T extends keyof CypherOptionsDef,
    K extends FilterOutVoid<CypherOptionsDef[T]>
  >(
    name: T,
    value: K
  ): void => {
    addCypher({ name, opts: value });
    setForm(undefined);
  };

  const serializedCyphers = selectedCyphers.map((meta) => {
    if ('opts' in meta) {
      return pipeCfg[meta.name].serialize(meta.opts);
    }
    return pipeCfg[meta.name].serialize();
  });

  return (
    <div>
      <div>
        <button onClick={() => handleAddCypher('railFence')}>
          add rail fence cypher
        </button>
        <button onClick={() => handleAddCypher('mirror')}>add mirror cypher</button>
        {formSchema && form && (
          <div>
            <DynamicForm
              schema={formSchema}
              onSubmit={(d) => handleFormSubmit(form, d)}
            />
          </div>
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
