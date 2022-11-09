import { CipherFactory } from '../types';

export type CaesarCipherOptions = {
  shift: number;
};

export const caesarCipherFactory: CipherFactory<CaesarCipherOptions> = ({ shift }) => {
  const alphabet = [...Array(26)].map((_, i) => (i + 10).toString(36));
  const transpositionMap: Record<string, string> = alphabet.reduce((acc, c, index) => {
    const newIndex = (index + shift) % alphabet.length;
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
