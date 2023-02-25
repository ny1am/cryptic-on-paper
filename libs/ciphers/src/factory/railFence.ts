import { CipherFactory } from '../types';

const createArrayRunnerMachine = (length: number) => {
  let caret = 0;
  let direction = 'forward' as 'forward' | 'back';

  const next = () => {
    if (length <= 1) return caret;

    if (direction === 'forward') {
      if (caret < length - 1) return ++caret;
      direction = 'back';
      return --caret;
    }

    if (caret > 0) return --caret;
    direction = 'forward';
    return ++caret;
  };

  return { caret, next };
};

export const createCaretIterator = (length: number) => {
  const machine = createArrayRunnerMachine(length);
  let caret = machine.caret;
  return {
    next() {
      const result = { value: caret, done: false };
      caret = machine.next();
      return result;
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

export type RailFenceCipherOptions = {
  height: number;
};

export const railFenceCipherFactory: CipherFactory<RailFenceCipherOptions> =
  ({ height }) =>
  (input: string): string => {
    const caretIterator = createCaretIterator(height);
    const rails = Array.from({ length: height }, () => '');
    for (const char of input) {
      rails[caretIterator.next().value] += char;
    }
    return rails.join('');
  };
