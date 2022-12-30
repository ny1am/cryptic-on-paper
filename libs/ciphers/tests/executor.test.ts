import { encrypt, railFenceCipherFactory, reverseCipherFactory } from '@/.';

describe('execute ciphers', () => {
  describe('encrypt', () => {
    it.concurrent('when one cipher', () => {
      const input = 'someSecureMessage';
      expect(encrypt([reverseCipherFactory()], input)).toBe(
        reverseCipherFactory()(input)
      );
    });

    it.concurrent('when multiple ciphers, expect correct execution order', () => {
      //setup
      const input = 'someSecureMessage';
      const cipher1 = reverseCipherFactory();
      const cipher2 = railFenceCipherFactory({ height: 5 });
      expect(encrypt([cipher1, cipher2], input)).not.toBe(
        encrypt([cipher2, cipher1], input)
      );
      //assert
      expect(encrypt([cipher1, cipher2], input)).toBe(cipher2(cipher1(input)));
    });

    it.concurrent('when no ciphers', () => {
      const input = 'someSecureMessage';
      expect(encrypt([], input)).toBe(input);
    });
  });
});
