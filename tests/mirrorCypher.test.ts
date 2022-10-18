import { mirrorCypher } from '@/features/cypher';

it('input: even amount of chars', () => {
  expect(mirrorCypher()('test')).toBe('tset');
});

it('input: odd amount of chars', () => {
  expect(mirrorCypher()('testing')).toBe('gnitset');
});
