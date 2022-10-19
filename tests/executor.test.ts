import { mirrorCypher, railFenceCypher } from '@/features/cypher';
import { execute } from '@/features/executor';

it('cyphers: one, string: any', () => {
  const input = 'someSecureMessage';
  expect(execute([mirrorCypher()], input)).toBe(mirrorCypher()(input));
});

it('insure correct execution order; cyphers: multiple, string: any', () => {
  const input = 'someSecureMessage';
  const cypher1 = mirrorCypher();
  const cypher2 = railFenceCypher({ depth: 5 });
  expect(execute([cypher1, cypher2], input)).toBe(cypher2(cypher1(input)));
});

it('cyphers: zero, string: any', () => {
  const input = 'someSecureMessage';
  expect(execute([], input)).toBe(input);
});
