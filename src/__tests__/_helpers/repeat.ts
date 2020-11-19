export const repeat = <T>(
  times: number,
  iteratee: (index: number) => T,
): T[] => [...Array(times)].map((_value, index) => iteratee(index))
