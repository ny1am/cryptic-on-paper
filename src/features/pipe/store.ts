import { v4 as generateUuid } from 'uuid';
import create from 'zustand';

import { CipherMeta } from '../config';

type UUID = string;

interface CiphersPipeState {
  ciphers: { meta: CipherMeta; uuid: UUID }[];
  isInitialized: boolean;
  actions: {
    add: (meta: CipherMeta) => void;
    delete: (uuid: UUID) => void;
    deleteAll: () => void;
  };
}

const useCiphersPipeStore = create<CiphersPipeState>((set) => ({
  ciphers: [],
  isInitialized: false,
  actions: {
    add: (meta: CipherMeta) =>
      set(({ ciphers }) => ({
        ciphers: [...(ciphers ?? []), { meta, uuid: generateUuid() }],
        isInitialized: true,
      })),
    delete: (uuid: UUID) =>
      set(({ ciphers }) => ({
        ciphers: ciphers.filter((c) => c.uuid !== uuid),
      })),
    deleteAll: () => set({ ciphers: [] }),
  },
}));

export const useIsPipeInitialized = () => useCiphersPipeStore((s) => s.isInitialized);
export const usePipeCiphers = () => useCiphersPipeStore((s) => s.ciphers);
export const useIsPipeEmpty = () => useCiphersPipeStore((s) => s.ciphers.length === 0);
export const usePipeActions = () => useCiphersPipeStore((s) => s.actions);
