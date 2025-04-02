/** Config variables */
const fontFamily = {
	sans: ['var(--font-neue)', 'sans-serif'],
}

/** Config variables */
const MIN_SIZE = 8
const MAX_SIZE = 200

const largeSpecificSizing = [206, 160, 150, 134]

const letterSpacing = {
	tighter: '-.04em',
	tightly: '-.03em',
	tight: '-.02em',
	snug: '-.01em',
	normal: '0em',
	roomy: '.01em',
	wider: '.04em',
}

const lineHeight = {
	narrow: '0.9',
	near: '1.0',
	tight: '1.1',
	snug: '1.2',
	comfy: '1.3',
	moderate: '1.4',
}

/** Auto generate sizes */
const regularSizing = new Array(MAX_SIZE - MIN_SIZE).fill(null).map((item, idx) => idx + MIN_SIZE)
const sizes = [...regularSizing, ...largeSpecificSizing]

const max = px => {
	return `max(${px}px,${px / 16}rem)`
}

const fontSize = sizes.reduce((result, size) => {
	result[size] = [max(size)]
	return result
}, {})

module.exports = {fontSize, letterSpacing, lineHeight, sizes, fontFamily}
