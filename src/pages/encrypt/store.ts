import { v4 as generateUuid } from 'uuid';
import create from 'zustand';

import { CipherMeta, CipherUIMeta } from './config';

interface CiphersPipeState {
  ciphers: CipherUIMeta[];
  isInit: boolean;
  add: (meta: CipherMeta) => void;
  deleteAll: () => void;
}

export const useCiphersPipeStore = create<CiphersPipeState>((set) => ({
  ciphers: [],
  isInit: false,
  add: (meta: CipherMeta) =>
    set((state) => ({
      ciphers: [...(state.ciphers ?? []), { meta, uuid: generateUuid() }],
      isInit: true,
    })),
  deleteAll: () => set({ ciphers: [] }),
}));
