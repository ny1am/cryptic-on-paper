import { DynamicForm } from '@/components/DynamicForm';

import { CypherKeysWithRequiredOptions, CyphersOptionsRegister } from '../config';
import { FormSchemaType, pipeCfg } from './pipeConfig';

type CypherOptionsFormProps<T extends CypherKeysWithRequiredOptions> = {
  cypherKey: T;
  handleSubmit: (cypherKey: T, value: CyphersOptionsRegister[T]) => void;
};

export function CypherOptionsForm<T extends CypherKeysWithRequiredOptions>({
  cypherKey: cypherKey,
  handleSubmit,
}: React.PropsWithoutRef<CypherOptionsFormProps<T>>) {
  const schema = pipeCfg[cypherKey].optionsSchema as FormSchemaType<T>;
  return <DynamicForm schema={schema} onSubmit={(d) => handleSubmit(cypherKey, d)} />;
}
