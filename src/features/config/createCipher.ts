import { Cipher } from '@/features/cipher';

import { ciphersRegister } from './register';
import { CipherMeta } from './types';

export function createCipher(meta: CipherMeta): Cipher {
  const factory = ciphersRegister[meta.key].factory as (
    opts: CipherMeta['options']
  ) => Cipher;
  return factory(meta.options);
}
