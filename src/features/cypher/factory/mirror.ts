import { CypherFactory } from '../types';

export const mirrorCypherFactory: CypherFactory =
  () =>
  (input: string): string =>
    Array.from(input).reverse().join('');
