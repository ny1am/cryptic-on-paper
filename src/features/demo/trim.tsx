import { trimCipherFactory } from '@/features/cipher';

interface Props {
  length: number;
}

export function TrimDemo({ length }: Props) {
  const originalText = 'The quick brown fox jumps over the lazy dog';
  const resultText = trimCipherFactory({ length })(originalText);

  return (
    <>
      <span className="font-mono text-sm">{resultText}</span>
    </>
  );
}
