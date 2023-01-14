/**
 * Limited set of keys that match a specific type on a mixed object
 * @url https://stackoverflow.com/questions/49752151/typescript-keyof-returning-specific-type
 */
export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown
}
