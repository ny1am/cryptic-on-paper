import { useCallback, useRef, useSyncExternalStore } from 'react';

export function useMotionReduced(): boolean {
  const { current: mediaQuery } = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null
  );

  const subscribe = useCallback(
    (callback: VoidFunction) => {
      mediaQuery?.addEventListener('change', callback);
      return () => mediaQuery?.removeEventListener('change', callback);
    },
    [mediaQuery]
  );

  const getSnapshot = useCallback(() => !!mediaQuery?.matches, [mediaQuery]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
