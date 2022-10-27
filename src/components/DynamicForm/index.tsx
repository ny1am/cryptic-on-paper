import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { ZodObject, ZodSchema } from 'zod';

type DynamicFormProps<T extends FieldValues> = {
  schema: ZodSchema<T>;
  onSubmit: (r: T) => void;
  onCancel: () => void;
};

export function DynamicForm<T extends FieldValues>({
  schema,
  onSubmit,
  onCancel,
}: React.PropsWithoutRef<DynamicFormProps<T>>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  //TODO: handle with TS
  if (!(schema instanceof ZodObject)) {
    throw new Error('schema should be an object');
  }

  const fieldNames = Object.keys(schema.shape) as Path<T>[];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fieldNames.map((name) => (
        <label key={name}>
          <span>{name}: </span>
          <input
            {...register(name, {
              valueAsNumber: schema.shape[name]._def.typeName === 'ZodNumber',
            })}
          />
          {errors[name] && <div>{errors[name]?.message as string}</div>}
        </label>
      ))}
      <div>
        <button type="submit">submit</button>
        <button type="button" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}
