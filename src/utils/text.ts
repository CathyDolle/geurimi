export const splitWords = (text: string, wrapWords = false) => {
	return text
		.replace(/\n/g, ' <br/> ')
		.split(/ /)
		.map(word =>
			word === '<br/>'
				? '<br/>'
				: wrapWords
					? `<span><span>${word}</span></span>`
					: `<span>${word}</span>`,
		)
		.join(' ')
		.replace(/ <br\/> /g, '<br/>')
}

export const splitChars = (text: string) => {
	return text
		.replace(/\n/g, ' <br/> ')
		.split(/ /)
		.map(word => {
			const chars = word
				.split(/(?!$)/u)
				.map(char => `<span><span>${char}</span></span>`)
				.join('')
			return word === '<br/>' ? '<br/>' : `${chars}`
		})
		.join(' ')
		.replace(/ <br\/> /g, '<br/>')
}
