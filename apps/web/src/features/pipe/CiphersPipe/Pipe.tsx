import { MinusCircleIcon } from '@heroicons/react/24/outline';

import { Badge } from '@/components/Badge';
import { IconButton } from '@/components/IconButton';
import { useAutoAnimate } from '@/lib/auto-animate';

import { usePipeActions, usePipeCiphers } from '../store';

export function Pipe() {
  const selectedCiphers = usePipeCiphers();
  const { delete: deleteCipher } = usePipeActions();

  const [listRef] = useAutoAnimate<HTMLOListElement>();
  return (
    <>
      <h2 className="text-lg">Ciphers execution order</h2>
      <ol ref={listRef} className="mt-4">
        {selectedCiphers.map(({ meta, uuid }) => (
          <li
            key={uuid}
            className="flex items-center justify-between border-b border-indigo-200 py-2 pl-2 dark:border-slate-500"
          >
            <div className="inline-flex flex-wrap gap-1 gap-x-2 overflow-x-hidden text-sm">
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
