import { toggleCaseCypherFactory } from '@/features/cypher';

it('input: all lower case', () => {
  expect(toggleCaseCypherFactory({})('test')).toBe('TEST');
});

it('input: all upper case', () => {
  expect(toggleCaseCypherFactory({})('TEST')).toBe('test');
});

it('input: mixed case', () => {
  expect(toggleCaseCypherFactory({})('TeSt')).toBe('tEsT');
});

it('input: has non-alphabetic chars', () => {
  expect(toggleCaseCypherFactory({})('TeS2t5. ,')).toBe('tEs2T5. ,');
});

it('input: mixed case, include: one char', () => {
  expect(toggleCaseCypherFactory({ include: 't' })('TeSt')).toBe('teST');
});

it('input: mixed case, include: two chars', () => {
  expect(toggleCaseCypherFactory({ include: 'te' })('TeSt')).toBe('tEST');
});

it('input: mixed case, include: two chars mixed case', () => {
  expect(toggleCaseCypherFactory({ include: 'tS' })('TeStus')).toBe('tesTuS');
});

it('input: empty', () => {
  expect(toggleCaseCypherFactory({})('')).toBe('');
});
