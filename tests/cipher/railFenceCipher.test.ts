import { railFenceCipherFactory } from '@/features/cipher';

it('depth: 2, input: short', () => {
  expect(railFenceCipherFactory({ depth: 2 })('test')).toBe('tset');
});

it('depth: 3, input: short', () => {
  expect(railFenceCipherFactory({ depth: 3 })('12345')).toBe('15243');
});

it('depth: 3, input: long', () => {
  expect(railFenceCipherFactory({ depth: 3 })('123456789')).toBe('159246837');
});

it('depth: 4, input: short', () => {
  expect(railFenceCipherFactory({ depth: 4 })('123456789')).toBe('172683594');
});

it('depth: 5, input: short', () => {
  expect(railFenceCipherFactory({ depth: 5 })('1234567890')).toBe('1928037465');
});

it('depth: 1, input: short', () => {
  expect(railFenceCipherFactory({ depth: 1 })('test')).toBe('test');
});
