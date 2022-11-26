import { reverseCipherFactory } from '@/features/cipher';

describe('reverse cipher', () => {
  it.concurrent.each([
    { input: 'testing', output: 'gnitset' },
    { input: '', output: '' },
  ])('encrypt basics', ({ input, output }) => {
    expect(reverseCipherFactory()(input)).toBe(output);
  });
});
