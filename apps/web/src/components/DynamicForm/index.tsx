import { zodResolver } from '@hookform/resolvers/zod';
import { cx } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { DeepPartial, DefaultValues, Path, useForm } from 'react-hook-form';
import { ZodObject, ZodSchema } from 'zod';

import { Button } from '@/components/Button';
import { RangeInput } from '@/components/RangeInput';
import { StepperInput } from '@/components/StepperInput';
import { TextInput } from '@/components/TextInput';

type Shape = { [x: string]: unknown };

//TODO: add type safety to props
export type DynamicFormUIConfig<T extends Shape> = {
  [P in keyof T]: {
    component: typeof RangeInput | typeof TextInput | typeof StepperInput;
    label?: string;
    valueAsNumber?: boolean;
    props: object;
  };
};

export type DynamicFormProps<T extends Shape> = {
  form: {
    validationSchema: ZodSchema<T>;
    uiFields: DynamicFormUIConfig<T>;
    defaultValues: T;
  };
  onSubmit: (r: T) => void;
  onChange: (r: DeepPartial<T>) => void;
  onCancel: () => void;
};

export function DynamicForm<T extends Shape>({
  form,
  onSubmit,
  onChange,
  onCancel,
}: React.PropsWithoutRef<DynamicFormProps<T>>) {
  const { validationSchema, uiFields, defaultValues } = form;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<T>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  useEffect(() => {
    const subscription = watch((value) => onChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  //TODO: handle with TS
  if (!(validationSchema instanceof ZodObject)) {
    throw new Error('schema should be an object');
  }

  const fieldNames = Object.keys(validationSchema.shape) as Path<T>[];
  const fields = fieldNames.map((name) => {
    const fieldCfg = uiFields[name];
    return {
      name,
      label: fieldCfg?.label ?? name,
      Component: fieldCfg?.component || TextInput,
      props: fieldCfg?.props,
      valueAsNumber: fieldCfg?.valueAsNumber,
      isOptional: validationSchema.shape[name].isOptional(),
      errorMsg: errors[name]?.message as string | undefined,
    };
  });
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      {fields.map(
        ({ name, label, isOptional, errorMsg, valueAsNumber, Component, props }) => (
          <div key={name}>
            <div className="flex items-end justify-between">
              <label htmlFor={name} className="block text-sm font-medium text-gray-300">
                {label}
              </label>
              {isOptional && (
                <span
                  id={`${name}-optional`}
                  className="ml-1 text-xs font-light text-gray-400"
                >
                  optional
                </span>
              )}
            </div>
            <div className="relative mt-1">
              <Component
                id={name}
                {...props}
                className={cx(
                  'w-full',
                  errorMsg && `border-red-300 focus:border-red-300 focus:ring-red-300`
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
              <p className="mt-2 text-sm text-red-400" id={`${name}-error`}>
                {errorMsg}
              </p>
            )}
          </div>
        )
      )}
      <div className="mt-10 flex justify-end gap-x-4">
        <Button type="submit" intent="primary">
          Submit
        </Button>
        <Button intent="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
