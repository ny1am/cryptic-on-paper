import { trimCipherFactory } from '@/features/cipher';

describe('trim cipher', () => {
  describe('encrypt', () => {
    it.concurrent('base case', () => {
      expect(trimCipherFactory({ length: 2 })('test')).toBe('te');
    });
    it.concurrent(`when input's length is less than cipher's length`, () => {
      expect(trimCipherFactory({ length: 5 })('test')).toBe('test');
    });
    it.concurrent(`when input's length equals cipher's length`, () => {
      expect(trimCipherFactory({ length: 4 })('test')).toBe('test');
    });
    it.concurrent(`when cipher's length equals zero`, () => {
      expect(trimCipherFactory({ length: 0 })('test')).toBe('');
    });
  });
});
