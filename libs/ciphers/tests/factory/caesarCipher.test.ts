import { caesarCipherFactory } from '@/.';

describe('caesar cipher', () => {
  it.concurrent.each([
    { shift: 0, input: 'test', output: 'test' },
    {
      shift: 23,
      input: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
      output: 'QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD',
    },
  ])('encrypt basics', ({ shift, input, output }) => {
    expect(caesarCipherFactory({ shift })(input)).toBe(output);
  });

  describe('encrypt', () => {
    it.concurrent('when mixed case input', () => {
      expect(
        caesarCipherFactory({ shift: 23 })('THE QUICK BROWN FOX JUMPS OVER THE LAZY dog')
      ).toBe('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ald');
    });

    it.concurrent('when input with special chars', () => {
      expect(
        caesarCipherFactory({ shift: 13 })('Why did the chicken cross the road?')
      ).toBe('Jul qvq gur puvpxra pebff gur ebnq?');
    });

    it.concurrent('when input with numbers', () => {
      expect(caesarCipherFactory({ shift: 13 })('12345')).toBe('12345');
    });
  });
});
