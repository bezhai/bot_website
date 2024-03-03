export function deleteKey<T>(map: T, key: keyof T): T {
  const { [key]: _, ...rest } = map;
  return rest as T;
}
