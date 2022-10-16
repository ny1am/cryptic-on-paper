import { assign, createMachine, interpret } from 'xstate';

const createArrayRunnerMachine = (length: number) =>
  createMachine({
    predictableActionArguments: true,
    context: { caret: 0, length },
    initial: 'wait',
    states: {
      wait: { on: { NEXT: 'move' } },
      move: {
        initial: 'forward',
        states: {
          forward: {
            on: {
              NEXT: [
                { cond: 'canMoveForward', target: 'forward', actions: ['moveForward'] },
                { cond: 'canMoveBack', target: 'back', actions: ['moveBack'] },
              ],
            },
          },
          back: {
            on: {
              NEXT: [
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

const createCaretIterator = (length: number) => {
  const machine = createArrayRunnerMachine(length);
  const runner = interpret(machine).start();
  return {
    next: () => runner.send('NEXT').context.caret,
  };
};

type RailFenceCypherOptions = {
  depth: 1 | 2 | 3 | 4 | 5;
};

export const railFenceCypher =
  ({ depth }: RailFenceCypherOptions) =>
  (input: string): string => {
    const caretIterator = createCaretIterator(depth);
    const rails = new Array(depth).fill('');
    for (let i = 0; i < input.length; i++) {
      const railIndex = caretIterator.next();
      rails[railIndex] += input[i];
    }
    return rails.join('');
  };
