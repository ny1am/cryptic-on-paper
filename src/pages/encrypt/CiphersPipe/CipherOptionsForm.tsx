import React, { useState } from 'react';

import { DynamicForm } from '@/components/DynamicForm';

import { CipherKeyWhenRequiredOptions, CiphersOptionsRegister } from '../config';
import { FormType, pipeCfg } from './pipeConfig';

type CipherOptionsFormProps<T extends CipherKeyWhenRequiredOptions> = {
  cipherKey: T;
  handleSubmit: (cipherKey: T, value: CiphersOptionsRegister[T]) => void;
  handleCancel: () => void;
};

export function CipherOptionsForm<T extends CipherKeyWhenRequiredOptions>({
  cipherKey,
  handleSubmit,
  handleCancel,
}: React.PropsWithoutRef<CipherOptionsFormProps<T>>) {
  const cfg = pipeCfg[cipherKey];
  const form = cfg.form;

  const [formState, setFormState] = useState<Partial<CiphersOptionsRegister[T]>>(
    form.defaultValues as CiphersOptionsRegister[T]
  );

  const description = cfg.meta.description.long || <p>{cfg.meta.description.short}</p>;
  const DemoComponent = cfg.meta.demo;

  return (
    <>
      <div className="mb-8">
        <div className="mb-4 text-xs font-light text-gray-500 tracking-wider leading-5 [&>p]:mt-2 dark:text-gray-400">
          {description}
        </div>

        {typeof DemoComponent !== 'undefined' && (
          <div
            className="h-[150px] mt-6 flex flex-col justify-center items-center border-y border-dashed border-indigo-200 dark:border-slate-500"
            aria-hidden="true"
          >
            <DemoComponent {...formState} />
          </div>
        )}
      </div>
      <DynamicForm
        form={form as FormType<T>}
        onSubmit={(d) => handleSubmit(cipherKey, d)}
        onChange={setFormState}
        onCancel={handleCancel}
      />
    </>
  );
}
