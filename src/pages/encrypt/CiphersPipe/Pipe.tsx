import { useContext } from 'react';

import { Badge } from '@/components/Badge';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersContext } from '../CiphersContext';

export function Pipe() {
  const { selectedCiphers } = useContext(CiphersContext);

  const [listRef] = useAutoAnimate<HTMLOListElement>();
  return (
    <>
      <h3 className="text-lg">Ciphers execution order</h3>
      <ol ref={listRef} className="mt-4">
        {selectedCiphers.map(({ meta, uuid }) => (
          <li key={uuid} className="px-4 py-2 text-sm">
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
    </>
  );
}
