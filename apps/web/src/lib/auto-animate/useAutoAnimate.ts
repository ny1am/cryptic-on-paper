import { useAutoAnimate as useAutoAnimateDefault } from '@formkit/auto-animate/react';

export const AUTO_ANIMATE_DURATION = 100;

export function useAutoAnimate<T extends Element>() {
  return useAutoAnimateDefault<T>({ duration: AUTO_ANIMATE_DURATION });
}
