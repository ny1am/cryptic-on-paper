import { useAutoAnimate as useAutoAnimateDefault } from '@formkit/auto-animate/react';

export function useAutoAnimate<T extends Element>() {
  return useAutoAnimateDefault<T>({ duration: 100 });
}
