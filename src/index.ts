export type MapFn<T, U> = (value?: T, index?: number, array?: T[]) => U;

export function partition<T>(
  iterable: Iterable<T>,
  fn: MapFn<T, boolean>
): [T[], T[]] {
  return Array.from(iterable).reduce(
    (accum, value, index, self) => {
      const resultIndex = fn(value, index, self) ? 0 : 1;
      accum[resultIndex].push(value);
      return accum;
    },
    [[], []]
  );
}

export function partitionMap<T, U>(
  iterable: Iterable<T>,
  fn: MapFn<T, U>
): Map<U, T[]> {
  return Array.from(iterable).reduce((accum, value, index, self) => {
    const resultKey = fn(value, index, self);

    accum.has(resultKey)
      ? accum.get(resultKey).push(value)
      : accum.set(resultKey, [value]);

    return accum;
  }, new Map());
}
