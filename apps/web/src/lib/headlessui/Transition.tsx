/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transition as RawTransition } from '@headlessui/react';
import { forwardRef } from 'react';

import { useMotionReduced } from '@/hooks';

const motionReducedOverrides = {
  enter: '',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: '',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
} as const;

const TransitionRoot = forwardRef(function TransitionNoRef(props, ref) {
  const motionReduced = useMotionReduced();
  return (
    <RawTransition
      ref={ref}
      {...(props as any)}
      {...(motionReduced ? motionReducedOverrides : {})}
    />
  );
}) as unknown as typeof RawTransition.Root;

const TransitionChild = forwardRef(function TransitionChildNoRef(props, ref) {
  const motionReduced = useMotionReduced();
  return (
    <RawTransition.Child
      ref={ref}
      {...(props as any)}
      {...(motionReduced ? motionReducedOverrides : {})}
    />
  );
}) as unknown as typeof RawTransition.Child;

export const Transition = Object.assign(TransitionRoot, {
  Child: TransitionChild,
  Root: TransitionRoot,
});
