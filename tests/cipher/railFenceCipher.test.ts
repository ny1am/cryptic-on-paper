import { railFenceCipherFactory } from '@/features/cipher';

it('height: 2, input: short', () => {
  expect(railFenceCipherFactory({ height: 2 })('test')).toBe('tset');
});

it('height: 3, input: short', () => {
  expect(railFenceCipherFactory({ height: 3 })('12345')).toBe('15243');
});

it('height: 3, input: long', () => {
  expect(railFenceCipherFactory({ height: 3 })('123456789')).toBe('159246837');
});

it('height: 4, input: short', () => {
  expect(railFenceCipherFactory({ height: 4 })('123456789')).toBe('172683594');
});

it('height: 5, input: short', () => {
  expect(railFenceCipherFactory({ height: 5 })('1234567890')).toBe('1928037465');
});

it('height: 1, input: short', () => {
  expect(railFenceCipherFactory({ height: 1 })('test')).toBe('test');
});
