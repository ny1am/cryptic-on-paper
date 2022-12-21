import { atom, useAtom } from 'jotai';

const plaintextAtom = atom<string>('');

export function usePlaintext() {
  return useAtom(plaintextAtom);
}
