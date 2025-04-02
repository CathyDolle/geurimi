import {useEffect, useRef, useState} from 'react'

//
// Source: https://github.com/sanity-io/ui/blob/main/src/hooks/useClickOutside.ts
//

const EMPTY_ARRAY: never[] = []

/**
 * @public
 */
export type ClickOutsideListener = (event: PointerEvent) => void

function _getElements (
	element: HTMLElement | null,
	elementsArg: Array<HTMLElement | HTMLElement[] | null>,
): HTMLElement[] {
	const ret = [element]

	for (const el of elementsArg) {
		if (Array.isArray(el)) {
			ret.push(...el)
		} else {
			ret.push(el)
		}
	}

	return ret.filter(Boolean) as HTMLElement[]
}

/**
 * @public
 */
function useClickOutside (
	listener: ClickOutsideListener,
	elementsArg: Array<HTMLElement | HTMLElement[] | null> = EMPTY_ARRAY,
	boundaryElement?: HTMLElement | null,
): (el: HTMLElement | null) => void {
	const [element, setElement] = useState<HTMLElement | null>(null)
	// const [elements, setElements] = useState(() => _getElements(element, elementsArg))
	const elementsRef = useRef(_getElements(element, elementsArg))

	useEffect(() => {
		const prevElements = elementsRef.current
		const nextElements = _getElements(element, elementsArg)

		if (prevElements.length !== nextElements.length) {
			// setElements(nextElements)
			elementsRef.current = nextElements

			return
		}

		for (const el of prevElements) {
			if (!nextElements.includes(el)) {
				// setElements(nextElements)
				elementsRef.current = nextElements

				return
			}
		}

		for (const el of nextElements) {
			if (!prevElements.includes(el)) {
				// setElements(nextElements)
				elementsRef.current = nextElements

				return
			}
		}
	}, [element, elementsArg])

	useEffect(() => {
		if (!listener) return undefined

		const handleWindowPointerDown = (evt: PointerEvent) => {
			const target = evt.target

			if (!(target instanceof Node)) {
				return
			}

			if (boundaryElement && !boundaryElement.contains(target)) {
				return
			}

			for (const el of elementsRef.current) {
				if (target === el || el.contains(target)) {
					return
				}
			}

			listener(evt)
		}

		window.addEventListener('pointerdown', handleWindowPointerDown)

		return () => {
			window.removeEventListener('pointerdown', handleWindowPointerDown)
		}
	}, [boundaryElement, listener])

	return setElement
}

export default useClickOutside
