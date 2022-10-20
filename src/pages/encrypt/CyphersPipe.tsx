import { useContext } from 'react';

import { RailFenceCypherOptions } from '@/features/cypher';

import { CiphersContext } from './CiphersContext';

const serializeCfg = {
  mirror: () => 'mirror',
  railFence: (opts: RailFenceCypherOptions) => `railFence (depth: ${opts.depth})`,
} as const;

export function CyphersPipe() {
  const { selectedCyphers, addCypher } = useContext(CiphersContext);

  const serializedCyphers = selectedCyphers.map((meta) =>
    serializeCfg[meta.name](('opts' in meta ? meta.opts : undefined) as any)
  );

  return (
    <div>
      <div>
        <button onClick={() => addCypher({ name: 'mirror' })}>add mirror cypher</button>
        <button onClick={() => addCypher({ name: 'railFence', opts: { depth: 3 } })}>
          add rail fence cypher
        </button>
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
