import { railFenceCipherFactory, reverseCipherFactory } from '@/features/cipher';
import { encrypt } from '@/features/cipher/executor';

it('ciphers: one, string: any', () => {
  const input = 'someSecureMessage';
  expect(encrypt([reverseCipherFactory()], input)).toBe(reverseCipherFactory()(input));
});

it('insure correct execution order; ciphers: multiple, string: any', () => {
  const input = 'someSecureMessage';
  const cipher1 = reverseCipherFactory();
  const cipher2 = railFenceCipherFactory({ depth: 5 });
  expect(encrypt([cipher1, cipher2], input)).toBe(cipher2(cipher1(input)));
});

it('ciphers: zero, string: any', () => {
  const input = 'someSecureMessage';
  expect(encrypt([], input)).toBe(input);
});
