export const mirrorCypher =
  () =>
  (input: string): string =>
    Array.from(input).reverse().join('');
