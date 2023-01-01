import { nokia3310CipherFactory } from '@/.';
describe('nokia 3310 cipher', () => {
  describe('encrypt', () => {
    it.concurrent('base case', () => {
      expect(
        nokia3310CipherFactory({ throttle: false })('abcdefghijklmnopqrstuvwxyz')
      ).toBe('22222233333344444455555566666677777777778888889999999999');
    });

    it.concurrent('when throttle', () => {
      expect(
        nokia3310CipherFactory({ throttle: true })('abcdefghijklmnopqrstuvwxyz')
      ).toBe('22233344455566677778889999');
    });

    it.concurrent('when contains characters to ignore', () => {
      expect(nokia3310CipherFactory({ throttle: true })('test ,.56#')).toBe('83780');
    });
  });
});
