const defaultTheme = require('tailwindcss/defaultTheme')

const screens = {
	...defaultTheme.screens,
	xxl: '1680px',
	'sm-max': {max: `${parseInt(defaultTheme.screens.sm) - 1}px`},
	'lg-max': {max: `${parseInt(defaultTheme.screens.lg) - 1}px`},
}

module.exports = screens
