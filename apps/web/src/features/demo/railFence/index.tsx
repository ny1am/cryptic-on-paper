import { useMotionReduced } from '@/hooks';

import { AnimatedRailFenceDemo } from './AnimatedRailFenceDemo';
import { BaseRailFenceDemo } from './BaseRailFenceDemo';

export function RailFenceDemo(props: Parameters<typeof BaseRailFenceDemo>[0]) {
  const motionReduced = useMotionReduced();
  const Component = motionReduced ? BaseRailFenceDemo : AnimatedRailFenceDemo;

  return <Component {...props} />;
}
