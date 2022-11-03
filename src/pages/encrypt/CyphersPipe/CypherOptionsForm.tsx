import React from 'react';

import { DynamicForm, DynamicFormUIConfig } from '@/components/DynamicForm';

import { CypherKeyWhenRequiredOptions, CyphersOptionsRegister } from '../config';
import { FormSchemaType, pipeCfg } from './pipeConfig';

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

  const schema = cfg.optionsSchema as FormSchemaType<T>;
  const uiConfig = cfg.uiConfig as DynamicFormUIConfig<CyphersOptionsRegister[T]>;
  const description = cfg.meta.description.long || cfg.meta.description.short;

  return (
    <>
      <p className="text-sm font-light text-gray-500 mb-8 max-w-[95%] tracking-wide">
        {description}
      </p>
      <DynamicForm
        schema={schema}
        uiConfig={uiConfig}
        onSubmit={(d) => handleSubmit(cypherKey, d)}
        onCancel={handleCancel}
      />
    </>
  );
}
