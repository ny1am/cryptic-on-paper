import { create } from 'zustand';

import { CipherMeta } from '../config';

type UUID = string;

type PipeCipher = { meta: CipherMeta; uuid: UUID };

interface CiphersPipeState {
  ciphers: PipeCipher[];
  isInitialized: boolean;
  actions: {
    add: (meta: CipherMeta) => void;
    delete: (uuid: UUID) => void;
    deleteAll: () => void;
    restore: (ciphers: PipeCipher[]) => void;
  };
}

const useCiphersPipeStore = create<CiphersPipeState>((set) => ({
  ciphers: [],
  isInitialized: false,
  actions: {
    add: (meta: CipherMeta) =>
      set(({ ciphers }) => ({
        ciphers: [...(ciphers ?? []), { meta, uuid: crypto.randomUUID() }],
        isInitialized: true,
      })),
    delete: (uuid: UUID) =>
      set(({ ciphers }) => ({
        ciphers: ciphers.filter((c) => c.uuid !== uuid),
      })),
    deleteAll: () => set({ ciphers: [] }),
    restore: (ciphers: PipeCipher[]) => set({ ciphers, isInitialized: true }),
  },
}));

export const useIsPipeInitialized = () => useCiphersPipeStore((s) => s.isInitialized);
export const usePipeCiphers = () => useCiphersPipeStore((s) => s.ciphers);
export const useIsPipeEmpty = () => useCiphersPipeStore((s) => s.ciphers.length === 0);
export const usePipeActions = () => useCiphersPipeStore((s) => s.actions);
