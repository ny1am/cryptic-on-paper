import { useContext } from 'react';

import { CiphersContext } from '../CiphersContext';
import { CypherMeta } from '../config';
import { AddButton } from './AddButton';
import { EmptyPipe } from './EmptyPipe';
import { pipeCfg } from './pipeConfig';

type SerializeType = CypherMeta['options'] extends infer R ? (opts: R) => string : never;

export function CyphersPipe() {
  const { selectedCyphers } = useContext(CiphersContext);

  const serializedCyphers = selectedCyphers.map((meta) => {
    const serialize = pipeCfg[meta.key].serialize as SerializeType;
    return serialize(meta.options);
  });

  return (
    <div className="rounded-md bg-white">
      <div className="border-b border-gray-200 px-4 pl-6 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium leading-10 text-gray-900">Pipe</h2>
          <div className="ml-4 shrink-0">
            <AddButton />
          </div>
        </div>
      </div>
      <div className="min-h-[16rem] p-6 flex flex-col">
        {selectedCyphers.length > 0 ? (
          <ul>
            {serializedCyphers.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        ) : (
          <div className="grow flex justify-center items-center mb-10">
            <EmptyPipe />
          </div>
        )}
      </div>
    </div>
  );
}
