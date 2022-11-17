import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersPipe } from './CiphersPipe';
import { EncryptForm } from './EncryptForm';
import { useCiphersPipeStore } from './store';

export function EncryptPage() {
  const isPipeInit = useCiphersPipeStore((s) => s.isInit);

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <>
      <div className="pattern-bg py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span>Cryptic </span>
              <span className="text-indigo-600 dark:text-indigo-300">on paper</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl dark:text-gray-400">
              Encrypt messages with simple ciphers that you could replicate on a piece of
              paper
            </p>
          </div>
        </div>
      </div>

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
