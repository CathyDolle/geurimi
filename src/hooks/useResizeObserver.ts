'use client'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import {DependencyList, RefObject} from 'react'

const resizeObserver: { current: ResizeObserver | null } = {current: null}
const cbs: Array<{ ref: RefObject<HTMLElement>; callback }> = []

const useResizeObserver = (
	ref: HTMLElement | RefObject<HTMLElement>,
	callback: (entry: ResizeObserverEntry, i: number, unobserve: () => void) => void,
	deps: DependencyList = [],
) => {
	useIsomorphicLayoutEffect(() => {
		const localRef: HTMLElement = ref?.current || ref

		const unobserve = () => {
			// unobserve ref target
			if (resizeObserver.current) {
				resizeObserver.current.unobserve(localRef)
				const index = cbs.findIndex(e => e.callback === callback)
				if (index !== -1) {
					cbs.splice(index, 1)
					if (cbs.length === 0) {
						resizeObserver.current.disconnect()
						resizeObserver.current = null
					}
				}
			}
		}

		// create a single static resize observer
		if (!resizeObserver.current) {
			resizeObserver.current = new ResizeObserver(entries => {
				cbs.forEach((cb, i) => {
					const entry = entries.find(e => {
						return (cb.ref.current || cb.ref) === e.target
					})
					if (entry) cb.callback(entry, i, unobserve)
				})
			})
		}

		// observe ref target
		resizeObserver.current.observe(localRef)
		cbs.push({ref, callback})

		return () => {
			unobserve()
		}
	}, [ref, ...deps])
}

export default useResizeObserver
