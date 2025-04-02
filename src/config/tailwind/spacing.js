const regularSpacing = new Array(450).fill(null).reduce((result, item, i) => {
	result[i] = i < 4 ? `${i}px` : `${i / 16}rem`
	return result
}, {})

const largeSpecificSpacing = [545, 583, 600, 700, 758, 1400].reduce((result, item) => {
	result[item] = `${item / 16}rem`
	return result
}, {})

const spacing = {
	header: 'var(--header)',
	...regularSpacing,
	...largeSpecificSpacing,
}

module.exports = spacing
