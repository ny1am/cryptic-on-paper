import { CipherFactory } from '../types';

export type TrimCipherOptions = {
  length: number;
};

export const trimCipherFactory: CipherFactory<TrimCipherOptions> =
  ({ length }) =>
  (input: string): string =>
    input.substring(0, length);
