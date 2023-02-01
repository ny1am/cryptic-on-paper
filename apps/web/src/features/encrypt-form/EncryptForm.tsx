import { cx } from 'class-variance-authority';

import { useIsPipeEmpty } from '@/features/pipe';
import { useAutoAnimate } from '@/lib/auto-animate';

import { EncryptedResult } from './EncryptedResult';
import { usePlaintext } from './store';

interface EncryptFormProps {
  className?: string;
}

export function EncryptForm({ className }: EncryptFormProps) {
  const [plaintext, setPlaintext] = usePlaintext();
  const handlePlaintextChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => void setPlaintext(value);

  const isPipeEmpty = useIsPipeEmpty();

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className={cx('flex flex-col', className)} ref={contentRef}>
      <div className="w-full">
        <label htmlFor="plaintext" className="sr-only">
          Message to encrypt
        </label>
        <textarea
          id="plaintext"
          placeholder="Message to encrypt..."
          rows={5}
          className="border-primary text-md focus-ring block w-full resize-none rounded-sm placeholder:font-light"
          value={plaintext || ''}
          onChange={handlePlaintextChange}
          data-test="input-plaintext"
        />
      </div>
      {plaintext && !isPipeEmpty && <EncryptedResult text={plaintext} />}
    </div>
  );
}
