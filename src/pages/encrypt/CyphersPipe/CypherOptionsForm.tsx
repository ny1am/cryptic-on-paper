import React, { useState } from 'react';

import { DynamicForm } from '@/components/DynamicForm';

import { CypherKeyWhenRequiredOptions, CyphersOptionsRegister } from '../config';
import { FormType, pipeCfg } from './pipeConfig';

type CypherOptionsFormProps<T extends CypherKeyWhenRequiredOptions> = {
  cypherKey: T;
  handleSubmit: (cypherKey: T, value: CyphersOptionsRegister[T]) => void;
  handleCancel: () => void;
};

export function CypherOptionsForm<T extends CypherKeyWhenRequiredOptions>({
  cypherKey: cypherKey,
  handleSubmit,
  handleCancel,
}: React.PropsWithoutRef<CypherOptionsFormProps<T>>) {
  const cfg = pipeCfg[cypherKey];
  const form = cfg.form;

  const [formState, setFormState] = useState<Partial<CyphersOptionsRegister[T]>>(
    form.defaultValues as CyphersOptionsRegister[T]
  );

  const description = cfg.meta.description.long || <p>{cfg.meta.description.short}</p>;
  const DemoComponent = cfg.meta.demo;

  return (
    <>
      <div className="mb-8">
        <div className="mb-4 text-xs font-light text-gray-500 tracking-wider leading-5">
          {description}
        </div>
        {typeof DemoComponent !== 'undefined' && <DemoComponent {...formState} />}
      </div>
      <DynamicForm
        form={form as FormType<T>}
        onSubmit={(d) => handleSubmit(cypherKey, d)}
        onChange={setFormState}
        onCancel={handleCancel}
      />
    </>
  );
}
