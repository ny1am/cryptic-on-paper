import { mirrorCypherFactory, railFenceCypherFactory } from '@/features/cypher';
import { encrypt } from '@/features/cypher/executor';

it('cyphers: one, string: any', () => {
  const input = 'someSecureMessage';
  expect(encrypt([mirrorCypherFactory()], input)).toBe(mirrorCypherFactory()(input));
});

it('insure correct execution order; cyphers: multiple, string: any', () => {
  const input = 'someSecureMessage';
  const cypher1 = mirrorCypherFactory();
  const cypher2 = railFenceCypherFactory({ depth: 5 });
  expect(encrypt([cypher1, cypher2], input)).toBe(cypher2(cypher1(input)));
});

it('cyphers: zero, string: any', () => {
  const input = 'someSecureMessage';
  expect(encrypt([], input)).toBe(input);
});
