import {
  railFenceCipherFactory,
  reverseCipherFactory,
  toggleCaseCipherFactory,
} from '@/features/cipher';

export const ciphersRegister = Object.freeze({
  'Reverse': reverseCipherFactory,
  'Rail fence': railFenceCipherFactory,
  'Toggle case': toggleCaseCipherFactory,
});

export type CiphersOptionsRegister = {
  [K in keyof typeof ciphersRegister]: Parameters<typeof ciphersRegister[K]> extends [
    infer A
  ]
    ? A
    : undefined;
};

export type CipherKeyWhenRequiredOptions = {
  [K in keyof CiphersOptionsRegister]: CiphersOptionsRegister[K] extends undefined
    ? never
    : K;
}[keyof CiphersOptionsRegister];

export type CipherMeta = {
  [K in keyof CiphersOptionsRegister]: {
    key: K;
    options: CiphersOptionsRegister[K];
  };
}[keyof CiphersOptionsRegister];

export type CipherUIMeta = {
  meta: CipherMeta;
  uuid: string;
};
