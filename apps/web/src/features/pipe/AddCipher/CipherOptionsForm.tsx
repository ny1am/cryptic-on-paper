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
        <div className="mb-4 text-xs font-light text-gray-500 tracking-wider leading-5 [&>p]:mt-2 dark:text-gray-400">
          {description}
        </div>

        {DemoComponent && (
          <div
            className="h-[150px] mt-6 flex flex-col justify-center items-center border-y border-dashed border-indigo-200 dark:border-slate-500"
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
