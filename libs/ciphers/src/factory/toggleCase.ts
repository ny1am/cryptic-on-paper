import { CipherFactory } from '../types';

export type ToggleCaseCipherOptions = {
  include?: string;
};

export const toggleCaseCipherFactory: CipherFactory<ToggleCaseCipherOptions> =
  ({ include = '' }) =>
  (input: string): string =>
    Array.from(input)
      .map((c) => {
        if (include && !include.toLowerCase().includes(c.toLocaleLowerCase())) {
          return c;
        }
        return c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase();
      })
      .join('');
