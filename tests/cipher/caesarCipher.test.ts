import { caesarCipherFactory } from '@/features/cipher';

it('shift: 0', () => {
  expect(caesarCipherFactory({ shift: 0 })('test')).toBe('test');
});

it('shift: 23', () => {
  expect(
    caesarCipherFactory({ shift: 23 })('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG')
  ).toBe('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD');
});

it('shift: 23, input: mixed case', () => {
  expect(
    caesarCipherFactory({ shift: 23 })('THE QUICK BROWN FOX JUMPS OVER THE LAZY dog')
  ).toBe('QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ald');
});

it('shift: 13, input: with special chars', () => {
  expect(caesarCipherFactory({ shift: 13 })('Why did the chicken cross the road?')).toBe(
    'Jul qvq gur puvpxra pebff gur ebnq?'
  );
});

it('shift: !0, input: numbers', () => {
  expect(caesarCipherFactory({ shift: 13 })('12345')).toBe('12345');
});
