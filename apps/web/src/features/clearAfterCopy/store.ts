import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ClearAfterCopyState {
  enabled: boolean;
  actions: {
    setEnabled: (enabled: boolean) => void;
  };
}

const useClearAfterCopyStore = create<ClearAfterCopyState>()(
  persist(
    (set) => ({
      enabled: false,
      actions: {
        setEnabled: (enabled: boolean) => set({ enabled }),
      },
    }),
    {
      name: 'cop:clear-after-copy',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ enabled }) => ({ enabled }),
    }
  )
);

export const useIsClearAfterCopyEnabled = () => useClearAfterCopyStore((s) => s.enabled);
export const useClearAfterCopyActions = () => useClearAfterCopyStore((s) => s.actions);
