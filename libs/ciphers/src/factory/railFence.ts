import { assign, createMachine, interpret } from 'xstate';

import { CipherFactory } from '../types';

const createArrayRunnerMachine = (length: number) =>
  createMachine({
    predictableActionArguments: true,
    context: { caret: 0, length },
    initial: 'wait',
    states: {
      'wait': { on: { 'NEXT': 'move' } },
      'move': {
        initial: 'forward',
        states: {
          'forward': {
            on: {
              'NEXT': [
                { cond: 'canMoveForward', target: 'forward', actions: ['moveForward'] },
                { cond: 'canMoveBack', target: 'back', actions: ['moveBack'] },
              ],
            },
          },
          'back': {
            on: {
              'NEXT': [
                { cond: 'canMoveBack', target: 'back', actions: ['moveBack'] },
                { cond: 'canMoveForward', target: 'forward', actions: ['moveForward'] },
              ],
            },
          },
        },
      },
    },
  }).withConfig({
    guards: {
      canMoveForward: ({ caret, length }) => caret < length - 1,
      canMoveBack: ({ caret }) => caret > 0,
    },
    actions: {
      moveBack: assign({ caret: ({ caret }) => caret - 1 }),
      moveForward: assign({ caret: ({ caret }) => caret + 1 }),
    },
  });

export const createCaretIterator = (length: number) => {
  const machine = createArrayRunnerMachine(length);
  const runner = interpret(machine).start();
  return {
    next() {
      const { context } = runner.send('NEXT');
      return { value: context.caret, done: false };
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
    const rails = new Array(height).fill('');
    for (const char of input) {
      rails[caretIterator.next().value] += char;
    }
    return rails.join('');
  };
