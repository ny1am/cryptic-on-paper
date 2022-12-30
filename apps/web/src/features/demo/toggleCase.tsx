import { toggleCaseCipherFactory } from '@cop/ciphers';

interface ToggleCaseDemoProps {
  include?: string;
}

export function ToggleCaseDemo({ include }: ToggleCaseDemoProps) {
  const originalText = 'The quick brown FOX jumps over the lazy DOG';
  const resultText = toggleCaseCipherFactory({ include })(originalText);

  return (
    <>
      <p className="font-mono text-sm">{originalText}</p>
      <p className="mt-6 font-mono text-sm">
        {Array.from(resultText).map((c, i) =>
          c !== originalText[i] ? <mark key={i}>{c}</mark> : <span key={i}>{c}</span>
        )}
      </p>
    </>
  );
}
