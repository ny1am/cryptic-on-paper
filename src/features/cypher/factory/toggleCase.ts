import { CypherFactory } from '../types';

type ToggleCaseCypherOptions = {
  include?: string;
};

export const toggleCaseCypherFactory: CypherFactory<ToggleCaseCypherOptions> =
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
