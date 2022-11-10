import { caesarCipherFactory } from '@/features/cipher';
import { latinAlphabet } from '@/utils';

interface CaesarDemoProps {
  shift: number;
}

export function CaesarDemo({ shift }: CaesarDemoProps) {
  const originalText = latinAlphabet.join('').toUpperCase();
  const resultText = caesarCipherFactory({ shift })(originalText);

  return (
    <div
      className="min-h-[150px] font-mono flex flex-col justify-center items-center text-center text-sm border-t border-b border-dashed border-indigo-200 tracking-widest"
      aria-hidden="true"
    >
      <span>{originalText}</span>
      <mark className="mt-6">{resultText}</mark>
    </div>
  );
}
