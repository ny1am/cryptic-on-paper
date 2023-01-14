export const latinAlphabet = Array.from(
  { length: 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1 },
  (_, i) => String.fromCharCode(i + 'a'.charCodeAt(0))
);
