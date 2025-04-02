export const offset: (node: HTMLElement, prop: 'offsetTop' | 'offsetLeft') => number = (node, prop = 'offsetTop') => {
	let top = 0

	while (node) {
		top += node[prop]
		node = node.offsetParent as HTMLElement
	}

	return top
}

export const offsetTop: (node: HTMLElement) => number = node => {
	return offset(node, 'offsetTop')
}

export const offsetLeft: (node: HTMLElement) => number = node => {
	return offset(node, 'offsetLeft')
}
