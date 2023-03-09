import React, { useState } from 'react';

import { DynamicForm } from '@/components/DynamicForm';
import { CipherMetaWithRequiredOptions, ciphersRegister } from '@/features/config';

type CipherOptionsFormProps<T extends CipherMetaWithRequiredOptions> = {
  cipherKey: T['key'];
  handleSubmit: (cipherKey: T['key'], value: T['options']) => void;
  handleCancel: () => void;
};

export function CipherOptionsForm<T extends CipherMetaWithRequiredOptions>({
  cipherKey,
  handleSubmit,
  handleCancel,
}: React.PropsWithoutRef<CipherOptionsFormProps<T>>) {
  const cfg = ciphersRegister[cipherKey];
  const { form, meta } = cfg;

  const [formState, setFormState] = useState(form.defaultValues);

  const description = meta.description.long || <p>{meta.description.short}</p>;
  const DemoComponent = meta.demo as undefined | ((p: T['options']) => JSX.Element);
  return (
    <>
      <div className="mb-8">
        <div className="mb-4 text-xs font-light leading-5 tracking-wider text-gray-400 [&>p]:mt-2">
          {description}
        </div>

        {DemoComponent && (
          <div
            className="mt-6 flex h-[150px] flex-col items-center justify-center border-y border-dashed border-slate-500"
            aria-hidden="true"
          >
            <DemoComponent {...formState} />
          </div>
        )}
      </div>
      <DynamicForm<T['options']>
        form={form}
        onSubmit={(d) => handleSubmit(cipherKey, d)}
        onChange={setFormState}
        onCancel={handleCancel}
      />
    </>
  );
}
