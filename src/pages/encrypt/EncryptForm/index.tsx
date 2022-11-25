import { cx } from 'class-variance-authority';
import { useState } from 'react';

import { useAutoAnimate } from '@/lib/auto-animate';

import { useIsPipeEmpty } from '../store';
import { EncryptedResult } from './EncryptedResult';

interface EncryptFormProps {
  className?: string;
}

export function EncryptForm({ className }: EncryptFormProps) {
  const [plainText, setPlainText] = useState<string>('');
  const handlePlainTextChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => void setPlainText(value);

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
          className="block w-full rounded-sm resize-none border-primary text-sm focus-ring placeholder:font-light"
          value={plainText || ''}
          onChange={handlePlainTextChange}
        />
      </div>
      {plainText && !isPipeEmpty && <EncryptedResult text={plainText} />}
    </div>
  );
}
