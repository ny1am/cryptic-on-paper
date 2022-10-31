import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'clsx';
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
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {fieldNames
        .map((name) => ({ name, shape: schema.shape[name] }))
        .map(({ name, shape }) => (
          <div key={name}>
            <div className="flex justify-between items-end">
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {name}
              </label>
              {shape.isOptional() && (
                <span
                  id={`${name}-optional`}
                  className="font-light text-xs ml-1 text-gray-400"
                >
                  optional
                </span>
              )}
            </div>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                id={name}
                type="text"
                className={cn(
                  'block w-full rounded-md text-sm focus:outline-none',
                  errors[name]
                    ? `pr-10 border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500`
                    : `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500`
                )}
                {...register(name, {
                  valueAsNumber: shape._def.typeName === 'ZodNumber',
                })}
                {...(shape.isOptional() && {
                  'aria-describedby': `${name}-optional`,
                })}
                {...(errors[name] && {
                  'aria-invalid': 'true',
                  'aria-describedby': `${name}-error`,
                })}
              />
              {errors[name] && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {errors[name] && (
              <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
                {errors[name]?.message as string}
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
