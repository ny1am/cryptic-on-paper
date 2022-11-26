import { toggleCaseCipherFactory } from '@/features/cipher';

describe('toggle case cipher', () => {
  describe('encrypt', () => {
    describe('no config', () => {
      it.concurrent('when input in lowercase, expect result in uppercase', () => {
        expect(toggleCaseCipherFactory({})('test')).toBe('TEST');
      });

      it.concurrent('when input in uppercase, expect result in lowercase', () => {
        expect(toggleCaseCipherFactory({})('TEST')).toBe('test');
      });

      it.concurrent('when input in mixed case, expect result in mixed case', () => {
        expect(toggleCaseCipherFactory({})('TeSt')).toBe('tEsT');
      });

      it.concurrent('when input has non-alphabetic chars, they should be ignored', () => {
        expect(toggleCaseCipherFactory({})('TeS2t5. ,')).toBe('tEs2T5. ,');
      });

      it.concurrent('when no input, expect not to crash', () => {
        expect(toggleCaseCipherFactory({})('')).toBe('');
      });
    });

    describe('config "include"', () => {
      it.concurrent('when include one char', () => {
        expect(toggleCaseCipherFactory({ include: 't' })('TeSt')).toBe('teST');
      });

      it.concurrent('when include two chars', () => {
        expect(toggleCaseCipherFactory({ include: 'te' })('TeSt')).toBe('tEST');
      });

      it.concurrent('when include two chars mixed case', () => {
        expect(toggleCaseCipherFactory({ include: 'tS' })('TeStus')).toBe('tesTuS');
      });
    });
  });
});
