import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { CipherMeta, createCipher } from '@/features/config';
import { usePlaintext } from '@/features/encrypt-form';
import { usePipeCiphers } from '@/features/pipe';

import { LogItem } from './LogItem';

type Props = {
  onDispose: () => void;
};

export function ExplainView({ onDispose }: Props) {
  const ciphers = usePipeCiphers();
  const [plaintext] = usePlaintext();

  const logMap: Record<string, string> = useMemo(
    () =>
      ciphers.reduce(
        ({ input, result }, cipher) => {
          const output = createCipher(cipher.meta)(input);
          return { result: { ...result, [cipher.uuid]: output }, input: output };
        },
        { result: {}, input: plaintext }
      ).result,
    [ciphers, plaintext]
  );

  return (
    <>
      <div className="flex justify-between">
        <h2 className="mb-4 text-lg font-medium leading-6">Logs</h2>
        <IconButton
          type="button"
          title="Close"
          className="shrink-0"
          noTooltip
          icon={<XMarkIcon className="w-5" />}
          onClick={onDispose}
        />
      </div>
      <div className="flex flex-col gap-y-6">
        <LogItem title="User input" text={plaintext} />
        {ciphers.map((c) => (
          <LogItem
            key={c.uuid}
            title={`${printCipherMeta(c.meta)} is applied`}
            text={logMap[c.uuid]}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-end">
        <Button onClick={onDispose} intent="cancel">
          Close
        </Button>
      </div>
    </>
  );
}

function printCipherMeta(c: CipherMeta) {
  const options = Object.entries(c.options ?? {})
    .filter((entry) => entry[1])
    .map(([key, value]) => `[${key}: ${value}]`)
    .join(' ');

  return `${c.key} ${options}`;
}
