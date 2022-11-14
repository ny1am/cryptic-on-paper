import { create } from 'zustand';

import { CipherMeta } from '@/features/config';
import { areIndexesInRange, swapItemsByIndexes } from '@cop/utils';

type UUID = string;

interface CiphersPipeState {
  ciphers: { meta: CipherMeta; uuid: UUID }[];
  isInitialized: boolean;
  actions: {
    add: (meta: CipherMeta) => void;
    delete: (uuid: UUID) => void;
    move: (uuid: UUID, direction: 'up' | 'down') => void;
    deleteAll: () => void;
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
    move: (uuid: UUID, direction) =>
      set((state) => {
        const { ciphers } = state;
        const index = ciphers.findIndex((c) => c.uuid === uuid);
        const swapIndex = index + 1 * (direction === 'up' ? -1 : 1);
        if (!areIndexesInRange(ciphers.length, index, swapIndex)) {
          return state;
        }
        return { ciphers: swapItemsByIndexes(ciphers, index, swapIndex) };
      }),
    deleteAll: () => set({ ciphers: [] }),
  },
}));

export const useIsPipeInitialized = () => useCiphersPipeStore((s) => s.isInitialized);
export const usePipeCiphers = () => useCiphersPipeStore((s) => s.ciphers);
export const useIsPipeEmpty = () => useCiphersPipeStore((s) => s.ciphers.length === 0);
export const usePipeActions = () => useCiphersPipeStore((s) => s.actions);
