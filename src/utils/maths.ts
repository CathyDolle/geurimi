export const lerp = (a: number, b: number, t: number) => a * (1 - t) + t * b

export const clamp = (x: number, min:number, max:number) =>
	min < max ? Math.min(Math.max(x, min), max) : Math.min(Math.max(x, max), min)

export const map = (n: number, start1: number, stop1: number, start2: number, stop2: number) =>
	clamp(((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2, start2, stop2)

export const precision = (value: number, floats = 3) => {
	const pow = Math.pow(10, floats)
	return ~~(value * pow) / pow
}

//@ts-ignore
export const damp = (a, b, lambda, dt) => {
	return lerp(a, b, 1 - Math.exp(-lambda * dt))
}

export const randomRange = (min = 0, max = 1) => precision(Math.random() * (max - min) + min, 2)
