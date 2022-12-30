import { latinAlphabet } from '@cop/utils';

import { CipherFactory } from '../types';

//to handle negative mod
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export type CaesarCipherOptions = {
  shift: number;
};

export const caesarCipherFactory: CipherFactory<CaesarCipherOptions> = ({ shift }) => {
  const alphabet = latinAlphabet;
  const transpositionMap: Record<string, string> = alphabet.reduce((acc, c, index) => {
    const newIndex = mod(index + shift, alphabet.length);
    return { ...acc, [c]: alphabet[newIndex] };
  }, {});

  return (input: string): string =>
    Array.from(input)
      .map((c) => {
        if (alphabet.includes(c.toLowerCase())) {
          const isLowerCase = c.toLowerCase() === c;
          const newChar = transpositionMap[c.toLowerCase()];
          return isLowerCase ? newChar : newChar.toUpperCase();
        }
        return c;
      })
      .join('');
};
