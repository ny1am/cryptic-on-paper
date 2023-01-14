import { nokia3310KeyMap } from '@cop/utils';

import { CipherFactory } from '../types';

export type Nokia3310CipherOptions = {
  throttle: boolean;
};

function repeatChar(char: string, times: number) {
  return Array.from({ length: times }, () => char).join('');
}

export const nokia3310CipherFactory: CipherFactory<Nokia3310CipherOptions> = ({
  throttle,
}) => {
  const charMap = new Map(
    Array.from(nokia3310KeyMap.entries()).flatMap(([n, str]) =>
      Array.from(str).map((c, i) => [c, throttle ? `${n}` : repeatChar(`${n}`, i + 1)])
    )
  );
  return (input: string): string =>
    Array.from(input)
      .map((c) => charMap.get(c))
      .filter(Boolean)
      .join('');
};
