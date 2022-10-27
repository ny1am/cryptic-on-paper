import { DynamicForm } from '@/components/DynamicForm';

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
  return (
    <DynamicForm
      key={cypherKey}
      schema={schema}
      onSubmit={(d) => handleSubmit(cypherKey, d)}
      onCancel={handleCancel}
    />
  );
}
