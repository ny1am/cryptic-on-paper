import { caesarCipherFactory } from '@/features/cipher';
import { latinAlphabet } from '@/utils';

interface CaesarDemoProps {
  shift: number;
}

export function CaesarDemo({ shift }: CaesarDemoProps) {
  const originalText = latinAlphabet.join('').toUpperCase();
  const resultText = caesarCipherFactory({ shift })(originalText);

  return (
    <>
      <span className="font-mono text-sm">{originalText}</span>
      <mark className="mt-6 font-mono text-sm">{resultText}</mark>
    </>
  );
}
