import {
  caesarCipherFactory,
  railFenceCipherFactory,
  reverseCipherFactory,
  toggleCaseCipherFactory,
} from '@/features/cipher';

export const ciphersRegister = Object.freeze({
  'Reverse': reverseCipherFactory,
  'Rail fence': railFenceCipherFactory,
  'Caesar': caesarCipherFactory,
  'Toggle case': toggleCaseCipherFactory,
});

type CiphersRegister = typeof ciphersRegister;
export type CipherMeta = {
  [K in keyof CiphersRegister]: {
    key: K;
    options: Parameters<CiphersRegister[K]> extends [infer A] ? A : undefined;
  };
}[keyof CiphersRegister];

export type CipherMetaWithRequiredOptions = Exclude<CipherMeta, { options: undefined }>;
