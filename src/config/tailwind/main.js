const {fontSize, letterSpacing, lineHeight, fontFamily} = require('./fonts')
const grid = require('./grid')
const colors = require('./colors')
const spacing = require('./spacing')
const zIndex = require('./z-index')
const transitionTimingFunction = require('./transition')
const screens = require('./screens')
const keyframes = require('./keyframes')
const animation = require('./animation')
const supports = require('./supports')
const width = require('./width')
const height = require('./height')

module.exports = {
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		spacing,
		fontSize,
		grid,
		screens,
		colors,
		fontFamily,
		extend: {
			letterSpacing,
			lineHeight,
			zIndex,
			transitionTimingFunction,
			keyframes,
			width,
			minWidth: {...spacing, width},
			maxWidth: {...spacing, width},
			height,
			minHeight: {...spacing, height},
			animation,
			...supports,
		},
	},
	plugins: [
		require('@numbered/tailwind-fluid-layout-system')({color: 'rgba(255,0,0,0.5)'}),
	],
}
