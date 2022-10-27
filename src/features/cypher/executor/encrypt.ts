import { Cypher } from '../types';

const pipe =
  <T>(arr: ((input: T) => T)[]) =>
  (v: T): T =>
    arr.reduce((r, fn) => fn(r), v);

export const encrypt = (cyphers: Cypher[], input: string): string => {
  return pipe<string>(cyphers)(input);
};