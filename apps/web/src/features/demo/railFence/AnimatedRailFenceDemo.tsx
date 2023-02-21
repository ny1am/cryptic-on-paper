import { useEffect, useRef } from 'react';

import { useThrottle } from '@/hooks';
import { autoAnimate } from '@/lib/auto-animate';

import { BaseRailFenceDemo } from './BaseRailFenceDemo';

export function AnimatedRailFenceDemo(props: Parameters<typeof BaseRailFenceDemo>[0]) {
  const height = useThrottle(props.height, 400);

  const parentRef = useRef(null);
  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  return <BaseRailFenceDemo ref={parentRef} height={height} />;
}
