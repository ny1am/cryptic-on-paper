import { toggleCaseCypher } from '@/features/cypher';

it('input: all lower case', () => {
  expect(toggleCaseCypher({})('test')).toBe('TEST');
});

it('input: all upper case', () => {
  expect(toggleCaseCypher({})('TEST')).toBe('test');
});

it('input: mixed case', () => {
  expect(toggleCaseCypher({})('TeSt')).toBe('tEsT');
});

it('input: has non-alphabetic chars', () => {
  expect(toggleCaseCypher({})('TeS2t5. ,')).toBe('tEs2T5. ,');
});

it('input: mixed case, include: one char', () => {
  expect(toggleCaseCypher({ include: 't' })('TeSt')).toBe('teST');
});

it('input: mixed case, include: two chars', () => {
  expect(toggleCaseCypher({ include: 'te' })('TeSt')).toBe('tEST');
});

it('input: mixed case, include: two chars mixed case', () => {
  expect(toggleCaseCypher({ include: 'tS' })('TeStus')).toBe('tesTuS');
});

it('input: empty', () => {
  expect(toggleCaseCypher({})('')).toBe('');
});
