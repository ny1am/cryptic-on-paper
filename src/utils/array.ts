export function swapItemsByIndexes<T>(arr: Array<T>, first: number, second: number) {
  const result = [...arr];
  const f = result.splice(first, 1)[0];
  result.splice(second, 0, f);
  return result;
}

export function areIndexesInRange(arrayLength: number, ...indexes: number[]) {
  return indexes.every((i) => i >= 0 && i < arrayLength);
}
