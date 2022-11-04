import { useContext } from 'react';

import { Badge } from '@/components/Badge';

import { CiphersContext } from '../CiphersContext';
import { AddButton } from './AddButton';
import { EmptyPipe } from './EmptyPipe';

export function CyphersPipe() {
  const { selectedCyphers } = useContext(CiphersContext);

  return (
    <div className="rounded-md bg-white shadow">
      <div className="min-h-[16rem] p-6 flex flex-col">
        {selectedCyphers.length > 0 ? (
          <ol className="divide-y divide-gray-200 list-decimal list-inside">
            {selectedCyphers.map((meta, i) => (
              <li key={i} className="px-6 py-4">
                {meta.key}
                {meta.options &&
                  Object.entries(meta.options)
                    .filter((entry) => entry[1])
                    .map(([key, value]) => (
                      <Badge key={key} className="ml-1">
                        {key}: <strong>{value}</strong>
                      </Badge>
                    ))}
              </li>
            ))}
          </ol>
        ) : (
          <div className="grow flex justify-center items-center mb-10">
            <EmptyPipe />
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 pl-6 py-3">
        <div className="flex justify-end">
          <AddButton />
        </div>
      </div>
    </div>
  );
}
