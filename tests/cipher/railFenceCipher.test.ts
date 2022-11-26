import { createCaretIterator, railFenceCipherFactory } from '@/features/cipher';

describe('caesar cipher', () => {
  it.concurrent.each([
    { height: 2, input: 'test', output: 'tset' },
    { height: 3, input: '12345', output: '15243' },
    { height: 3, input: '123456789', output: '159246837' },
    { height: 4, input: '123456789', output: '172683594' },
    { height: 5, input: '1234567890', output: '1928037465' },
    { height: 1, input: 'test', output: 'test' },
  ])('encrypt basics', ({ height, input, output }) => {
    expect(railFenceCipherFactory({ height })(input)).toBe(output);
  });
});

describe('caret iterator', () => {
  const callLimitHelper = ((limit) => {
    let count = 0;
    return {
      next: () => ++count >= limit,
    };
  })(100);

  it('check whether iterable', () => {
    const length = 3;
    const iterable = createCaretIterator(length);
    for (const caret of iterable) {
      expect(caret).toBeGreaterThanOrEqual(0);
      expect(caret).toBeLessThan(length);
      if (!callLimitHelper.next()) break;
    }
  });
});
