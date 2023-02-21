import { useEffect, useRef, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useMotionReduced(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    window.matchMedia(QUERY).matches
  );

  const { current: mediaQuery } = useRef(window.matchMedia(QUERY));

  useEffect(() => {
    const listener = () => {
      setPrefersReducedMotion(!!mediaQuery.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [mediaQuery]);

  return prefersReducedMotion;
}
