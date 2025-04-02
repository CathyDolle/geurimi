'use client'

import {useState, useRef, type MutableRefObject} from 'react'
import {WindowEvent} from './useWindowEvent'
import useWindowResize from './useWindowResize'

export interface WindowSize {
	innerWidth: number
	innerHeight: number
	documentHeight: number
	offsetHeight: number
}
type WindowSizeRef = MutableRefObject<WindowSize>

type RefOrType<T extends boolean> = T extends true
	? WindowSizeRef
	: WindowSize

const useWindowSize = <T extends boolean>(
	asRef: T,
	debounce = 0,
): RefOrType<T> => {
	const ref = useRef<WindowSize>({innerWidth: 0, innerHeight: 0, documentHeight: 0, offsetHeight: 0})
	const [windowSize, setWindowSize] = useState<WindowSize>({
		innerWidth: 0,
		innerHeight: 0,
		documentHeight: 0,
		offsetHeight: 0,
	})

	useWindowResize(
		(e: WindowEvent) => {
			ref.current.innerWidth = e?.innerWidth || 0
			ref.current.innerHeight = e?.innerHeight || 0
			ref.current.documentHeight = e?.documentHeight || 0
			ref.current.offsetHeight = e?.offsetHeight || 0

			if (!asRef) setWindowSize(ref.current)
		},
		true,
		[],
		debounce,
	)

	return (asRef ? ref : windowSize) as RefOrType<T>
}

export default useWindowSize
