import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';

import { Badge } from '@/components/Badge';
import { IconButton } from '@/components/IconButton';
import { useAutoAnimate } from '@/lib/auto-animate';

import { usePipeActions, usePipeCiphers } from '../store';

export function Pipe() {
  const selectedCiphers = usePipeCiphers();
  const { delete: deleteCipher, move: moveCipher } = usePipeActions();

  const [listRef] = useAutoAnimate<HTMLOListElement>();
  return (
    <>
      <h2 className="text-lg">Ciphers execution order</h2>
      <ol ref={listRef} className="mt-4">
        {selectedCiphers.map(({ meta, uuid }, index, self) => (
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
            <div className="shrink-0">
              <IconButton
                title="Move up"
                icon={<ArrowSmallUpIcon className="w-4" />}
                disabled={index === 0}
                onClick={() => void moveCipher(uuid, 'up')}
              />
              <IconButton
                title="Move down"
                icon={<ArrowSmallDownIcon className="w-4" />}
                disabled={index === self.length - 1}
                onClick={() => void moveCipher(uuid, 'down')}
              />
              <IconButton
                title="Delete"
                icon={<MinusCircleIcon className="w-5" />}
                onClick={() => void deleteCipher(uuid)}
              />
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
