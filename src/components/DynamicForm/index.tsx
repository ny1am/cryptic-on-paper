import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'clsx';
import React from 'react';
import { Path, useForm } from 'react-hook-form';
import { ZodObject, ZodSchema } from 'zod';

import { Button } from '@/components/Button';
import { RangeInput } from '@/components/RangeInput';
import { TextInput } from '@/components/TextInput';

type Shape = { [x: string]: unknown };

//TODO: add type safety to props
export type DynamicFormUIConfig<T extends Shape> = {
  [P in keyof T]: {
    component: typeof RangeInput | typeof TextInput;
    valueAsNumber?: boolean;
    props: object;
  };
};

type DynamicFormProps<T extends Shape> = {
  schema: ZodSchema<T>;
  uiConfig: DynamicFormUIConfig<T>;
  onSubmit: (r: T) => void;
  onCancel: () => void;
};

export function DynamicForm<T extends Shape>({
  schema,
  uiConfig,
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
    const fieldCfg = uiConfig[name];
    return {
      name,
      Component: fieldCfg?.component || TextInput,
      props: fieldCfg?.props,
      valueAsNumber: fieldCfg?.valueAsNumber,
      isOptional: schema.shape[name].isOptional(),
      errorMsg: errors[name]?.message as string | undefined,
    };
  });
  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ name, isOptional, errorMsg, valueAsNumber, Component, props }) => (
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
              {...props}
              className={cn(
                'w-full',
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
        <Button type="submit" primary>
          Submit
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
