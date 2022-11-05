import { CipherFactory } from '../types';

export const reverseCipherFactory: CipherFactory =
  () =>
  (input: string): string =>
    Array.from(input).reverse().join('');
