import { ArrowDownIcon } from '@heroicons/react/24/outline';
import cn from 'clsx';

import { toggleCaseCipherFactory } from '../cipher';

interface ToggleCaseDemoProps {
  include?: string;
}

export function ToggleCaseDemo({ include }: ToggleCaseDemoProps) {
  const originalText = 'The quick brown FOX jumps over the lazy DOG';
  const resultText = toggleCaseCipherFactory({ include })(originalText);

  return (
    <div
      className="min-h-[150px] flex flex-col justify-center items-center text-center text-sm border-t border-b border-dashed border-indigo-200"
      aria-hidden="true"
    >
      <p>{originalText}</p>
      <ArrowDownIcon className="w-[1.125rem] my-[0.625rem] text-indigo-700" />
      <p>
        {Array.from(resultText).map((c, i) => (
          <span key={i} className={cn(c !== originalText[i] && 'text-orange-600')}>
            {c}
          </span>
        ))}
      </p>
    </div>
  );
}
