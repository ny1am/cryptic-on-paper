import { toggleCaseCypher } from '@/features/cypher';

it('input: all lower case', () => {
  expect(toggleCaseCypher()('test')).toBe('TEST');
});

it('input: all upper case', () => {
  expect(toggleCaseCypher()('TEST')).toBe('test');
});

it('input: mixed case', () => {
  expect(toggleCaseCypher()('TeSt')).toBe('tEsT');
});

it('input: has non-alphabetic chars', () => {
  expect(toggleCaseCypher()('TeS2t5. ,')).toBe('tEs2T5. ,');
});

it('input: empty', () => {
  expect(toggleCaseCypher()('')).toBe('');
});
