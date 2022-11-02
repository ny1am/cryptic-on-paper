import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'clsx';
import React from 'react';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { ZodObject, ZodSchema } from 'zod';

import { TextInput } from '../TextInput';

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
  const fields = fieldNames.map((name) => {
    const shape = schema.shape[name];
    return {
      name,
      isOptional: shape.isOptional(),
      valueAsNumber: shape._def.typeName === 'ZodNumber',
      errorMsg: errors[name]?.message as string | undefined,
      Component: TextInput,
    };
  });
  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ name, isOptional, errorMsg, valueAsNumber, Component }) => (
        <div key={name}>
          <div className="flex justify-between items-end">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              {name}
            </label>
            {isOptional && (
              <span
                id={`${name}-optional`}
                className="font-light text-xs ml-1 text-gray-400"
              >
                optional
              </span>
            )}
          </div>
          <div className="relative mt-1">
            <Component
              id={name}
              className={cn(
                errorMsg
                  ? `pr-10 border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500`
                  : `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`
              )}
              {...register(name, { valueAsNumber })}
              {...(isOptional && { 'aria-describedby': `${name}-optional` })}
              {...(errorMsg && {
                'aria-invalid': 'true',
                'aria-describedby': `${name}-error`,
              })}
            />
          </div>
          {errorMsg && (
            <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
              {errorMsg}
            </p>
          )}
        </div>
      ))}
      <div className="mt-8 flex justify-end gap-x-4">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
