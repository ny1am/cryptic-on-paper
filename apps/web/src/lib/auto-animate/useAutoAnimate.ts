import autoAnimateDefault from '@formkit/auto-animate';
import { useAutoAnimate as useAutoAnimateDefault } from '@formkit/auto-animate/react';

export const AUTO_ANIMATE_DURATION = 100;

export function useAutoAnimate<T extends Element>() {
  return useAutoAnimateDefault<T>({ duration: AUTO_ANIMATE_DURATION });
}

export function autoAnimate(el: HTMLElement) {
  return autoAnimateDefault(el, { duration: AUTO_ANIMATE_DURATION });
}
