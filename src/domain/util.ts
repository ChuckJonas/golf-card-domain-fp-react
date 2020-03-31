

export function replaceAt<T>(array: T[], index: number, value: T): T[] {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}
