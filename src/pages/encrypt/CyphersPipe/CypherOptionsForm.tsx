import React from 'react';

import { Dialog } from '@/components/Dialog';
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
  const schema = pipeCfg[cypherKey].optionsSchema as FormSchemaType<T>;
  const uiConfig = pipeCfg[cypherKey].uiConfig as DynamicFormUIConfig<
    CyphersOptionsRegister[T]
  >;
  return (
    <Dialog title={`${cypherKey} options`} onClose={handleCancel}>
      <DynamicForm
        schema={schema}
        uiConfig={uiConfig}
        onSubmit={(d) => handleSubmit(cypherKey, d)}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
