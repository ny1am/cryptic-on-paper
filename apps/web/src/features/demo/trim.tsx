import { trimCipherFactory } from '@cop/ciphers';

interface Props {
  length: number;
}

export function TrimDemo({ length }: Props) {
  const originalText = `The quick brown fox jumps over the lazy dog.    And more...`;
  const resultText = trimCipherFactory({ length })(originalText);

  return (
    <span className="w-full break-words text-center font-mono text-sm">{resultText}</span>
  );
}
