import { CypherFactory } from './types';

export const mirrorCypher: CypherFactory =
  () =>
  (input: string): string =>
    Array.from(input).reverse().join('');
