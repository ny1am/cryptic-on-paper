import { Hero } from '@/components/Hero';
import { EncryptForm } from '@/features/encrypt-form';
import { CiphersPipe, useIsPipeInitialized } from '@/features/pipe';
import { useAutoAnimate } from '@/lib/auto-animate';

export function EncryptPage() {
  const isPipeInitialized = useIsPipeInitialized();

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
        {isPipeInitialized && <EncryptForm className="basis-72 grow shrink-0" />}
      </div>
    </>
  );
}
