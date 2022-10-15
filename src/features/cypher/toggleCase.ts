export const toggleCaseCypher =
  () =>
  (input: string): string =>
    Array.from(input)
      .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
      .join('');
