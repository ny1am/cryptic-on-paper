import { toggleCaseCipherFactory } from '../cipher';

interface ToggleCaseDemoProps {
  include?: string;
}

export function ToggleCaseDemo({ include }: ToggleCaseDemoProps) {
  const originalText = 'The quick brown FOX jumps over the lazy DOG';
  const resultText = toggleCaseCipherFactory({ include })(originalText);

  return (
    <div
      className="min-h-[150px] font-mono flex flex-col justify-center items-center text-center text-sm border-t border-b border-dashed border-indigo-200"
      aria-hidden="true"
    >
      <p>{originalText}</p>
      <p className="mt-6">
        {Array.from(resultText).map((c, i) =>
          c !== originalText[i] ? <mark key={i}>{c}</mark> : <span key={i}>{c}</span>
        )}
      </p>
    </div>
  );
}
