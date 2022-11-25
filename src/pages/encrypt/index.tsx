import { Hero } from '@/components/Hero';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersPipe } from './CiphersPipe';
import { EncryptForm } from './EncryptForm';
import { useIsPipeInit } from './store';

export function EncryptPage() {
  const isPipeInit = useIsPipeInit();

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <>
      <Hero />
      <div
        ref={contentRef}
        className="mt-4 max-w-4xl mx-auto flex flex-wrap px-4 gap-4 lg:gap-10 lg:mt-10"
      >
        <div className="basis-72 grow-[10] shrink-0 overflow-x-hidden lg:max-w-lg lg:mx-auto">
          <CiphersPipe />
        </div>
        {isPipeInit && <EncryptForm className="basis-72 grow shrink-0" />}
      </div>
    </>
  );
}
