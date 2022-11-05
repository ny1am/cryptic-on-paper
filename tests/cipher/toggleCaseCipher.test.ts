import { toggleCaseCipherFactory } from '@/features/cipher';

it('input: all lower case', () => {
  expect(toggleCaseCipherFactory({})('test')).toBe('TEST');
});

it('input: all upper case', () => {
  expect(toggleCaseCipherFactory({})('TEST')).toBe('test');
});

it('input: mixed case', () => {
  expect(toggleCaseCipherFactory({})('TeSt')).toBe('tEsT');
});

it('input: has non-alphabetic chars', () => {
  expect(toggleCaseCipherFactory({})('TeS2t5. ,')).toBe('tEs2T5. ,');
});

it('input: mixed case, include: one char', () => {
  expect(toggleCaseCipherFactory({ include: 't' })('TeSt')).toBe('teST');
});

it('input: mixed case, include: two chars', () => {
  expect(toggleCaseCipherFactory({ include: 'te' })('TeSt')).toBe('tEST');
});

it('input: mixed case, include: two chars mixed case', () => {
  expect(toggleCaseCipherFactory({ include: 'tS' })('TeStus')).toBe('tesTuS');
});

it('input: empty', () => {
  expect(toggleCaseCipherFactory({})('')).toBe('');
});
