import { mirrorCypherFactory } from '@/features/cypher';

it('input: even amount of chars', () => {
  expect(mirrorCypherFactory()('test')).toBe('tset');
});

it('input: odd amount of chars', () => {
  expect(mirrorCypherFactory()('testing')).toBe('gnitset');
});
