import { MinusCircleIcon } from '@heroicons/react/24/outline';

import { Badge } from '@/components/Badge';
import { IconButton } from '@/components/IconButton';
import { useAutoAnimate } from '@/lib/auto-animate';

import { useCiphersPipeStore } from '../store';

export function Pipe() {
  const selectedCiphers = useCiphersPipeStore((s) => s.ciphers);
  const deleteCipher = useCiphersPipeStore((s) => s.delete);

  const [listRef] = useAutoAnimate<HTMLOListElement>();
  return (
    <>
      <h3 className="text-lg">Ciphers execution order</h3>
      <ol ref={listRef} className="mt-4">
        {selectedCiphers.map(({ meta, uuid }) => (
          <li
            key={uuid}
            className="pl-2 py-2 flex items-center justify-between border-b border-indigo-200 dark:border-slate-500"
          >
            <div className="text-sm inline-flex flex-wrap gap-1 gap-x-2 overflow-x-hidden">
              {meta.key}
              {meta.options &&
                Object.entries(meta.options)
                  .filter((entry) => entry[1])
                  .map(([key, value]) => (
                    <Badge key={key}>
                      {key}: <strong>{value}</strong>
                    </Badge>
                  ))}
            </div>
            <IconButton
              title="Delete"
              className="shrink-0"
              icon={<MinusCircleIcon className="w-5" />}
              onClick={() => void deleteCipher(uuid)}
            />
          </li>
        ))}
      </ol>
    </>
  );
}
