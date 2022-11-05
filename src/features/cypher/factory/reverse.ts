import { CypherFactory } from '../types';

export const reverseCypherFactory: CypherFactory =
  () =>
  (input: string): string =>
    Array.from(input).reverse().join('');
