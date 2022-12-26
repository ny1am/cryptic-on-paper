import { ciphersRegister } from './register';

type CiphersRegister = typeof ciphersRegister;
export type CipherMeta = {
  [K in keyof CiphersRegister]: {
    key: K;
    options: Parameters<CiphersRegister[K]['factory']> extends [infer A] ? A : undefined;
  };
}[keyof CiphersRegister];

export type CipherMetaWithRequiredOptions = Exclude<CipherMeta, { options: undefined }>;
