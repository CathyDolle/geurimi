/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const resolveConfig = require('tailwindcss/resolveConfig.js')
const tailwindConfig = require('./main')

const {theme} = resolveConfig(tailwindConfig)

const toNumber = v => {
	if (typeof v !== 'object') return v
	return Object.fromEntries(
		Object.entries(v).map(([k, v]) => {
			return [k, typeof v === 'string' ? parseInt(v) : toNumber(v)]
		}),
	)
}

theme.screens = toNumber(theme.screens)

const code = `/* eslint-disable */
export const screens = ${JSON.stringify(theme.screens)}
export const devices = ${JSON.stringify(theme.grid)}
export const fontFamily = ${JSON.stringify(theme.fontFamily)}
export const fontSize = ${JSON.stringify(theme.fontSize)}
`.replace(/"/g, '\'')

const distDir = path.resolve(__dirname, '../dist')

try {
	/** check if dist dir exists, if not, create it so we can add the theme file */
	if (!fs.existsSync(distDir)) {
		fs.mkdirSync(distDir)
	}
	fs.writeFileSync(path.join(distDir, 'theme.ts'), code, 'utf-8')
} catch (err) {
	// uh-oh, something happened here!
	console.log(err.message)
}