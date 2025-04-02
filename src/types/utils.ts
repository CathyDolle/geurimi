/**
 * Make all properties in T optional and null
 */
export type Nullable<T> = {
	[P in keyof T]?: T[P] | null
}
