import { reverseCypherFactory } from '@/features/cypher';

it('input: even amount of chars', () => {
  expect(reverseCypherFactory()('test')).toBe('tset');
});

it('input: odd amount of chars', () => {
  expect(reverseCypherFactory()('testing')).toBe('gnitset');
});
