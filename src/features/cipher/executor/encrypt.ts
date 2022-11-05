import { Cipher } from '../types';

const pipe =
  <T>(arr: ((input: T) => T)[]) =>
  (v: T): T =>
    arr.reduce((r, fn) => fn(r), v);

export const encrypt = (ciphers: Cipher[], input: string): string => {
  return pipe<string>(ciphers)(input);
};
