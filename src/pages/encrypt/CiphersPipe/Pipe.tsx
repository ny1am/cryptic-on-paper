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
            className="pl-2 py-2 flex items-center justify-between border-b border-indigo-200"
          >
            <span className="text-sm">
              {meta.key}
              {meta.options &&
                Object.entries(meta.options)
                  .filter((entry) => entry[1])
                  .map(([key, value]) => (
                    <Badge key={key} className="ml-1">
                      {key}: <strong>{value}</strong>
                    </Badge>
                  ))}
            </span>
            <IconButton
              title="Delete"
              icon={<MinusCircleIcon className="w-5" />}
              onClick={() => void deleteCipher(uuid)}
            />
          </li>
        ))}
      </ol>
    </>
  );
}
