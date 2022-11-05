import { reverseCipherFactory } from '@/features/cipher';

it('input: even amount of chars', () => {
  expect(reverseCipherFactory()('test')).toBe('tset');
});

it('input: odd amount of chars', () => {
  expect(reverseCipherFactory()('testing')).toBe('gnitset');
});
