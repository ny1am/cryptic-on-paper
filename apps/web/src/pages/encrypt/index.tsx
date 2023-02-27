import { Hero } from '@/components/Hero';
import { EncryptForm } from '@/features/encryptForm';
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
        className="mx-auto mt-4 flex max-w-4xl flex-wrap gap-4 px-4 lg:mt-10 lg:gap-10"
      >
        <div className="shrink-0 grow-[10] basis-72 overflow-x-hidden lg:mx-auto lg:max-w-lg">
          <CiphersPipe />
        </div>
        {isPipeInitialized && <EncryptForm className="shrink-0 grow basis-72" />}
      </div>
    </>
  );
}