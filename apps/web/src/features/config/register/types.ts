import { CipherFactory } from '@cop/ciphers';
import React from 'react';
import zod from 'zod';

import { DynamicFormUIConfig } from '@/components/DynamicForm';

type Shape = { [k: string]: unknown };

type FormType<T extends Shape> = {
  validationSchema: zod.ZodSchema<T>;
  uiFields: DynamicFormUIConfig<T>;
  defaultValues: T;
};

export type CipherConfig<O extends void | Shape> = {
  factory: CipherFactory<O>;
  form: O extends Shape ? FormType<O> : undefined;
  meta: {
    description: {
      short: string;
      long?: React.JSX.Element;
    };
    demo?: O extends Shape ? (props: O) => React.JSX.Element : undefined;
  };
};
