import { Badge } from '@/components/Badge';
import { useAutoAnimate } from '@/lib/auto-animate';

import { useCiphersPipeStore } from '../store';

export function Pipe() {
  const selectedCiphers = useCiphersPipeStore((s) => s.ciphers);

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
