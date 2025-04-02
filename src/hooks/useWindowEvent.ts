'use client'

import debounce from 'debounce'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export type WindowEvent = {
	type: string
	target?: Element
	manual?: boolean
	scrollY?: number
	pageYOffset?: number
	innerWidth?: number
	innerHeight?: number
	documentHeight?: number
	offsetWidth?: number
	offsetHeight?: number
}

type CallBackEvent = {
	cbs: Array<(e: WindowEvent) => void>
	cb: (e: Event) => void
}

/**
 * We ensure there's only one event of each type
 */
export const events: Record<string, CallBackEvent | null> = {}
export const data = {
	pageYOffset: 0,
	innerWidth: 0,
	innerHeight: 0,
	documentHeight: 0,
	offsetWidth: 0,
	offsetHeight: 0,
}

/**
 * Mapping event
 * Because window events are unik, we can add
 * intensive getters to the returned event.
 */
const map = (
	e: Event | UIEvent | { type: string; manual: boolean },
): WindowEvent => {
	const _e: WindowEvent = {type: e.type}

	switch (e.type) {
		case 'scroll':
			if (e instanceof Event) data.pageYOffset = window.pageYOffset
			_e.pageYOffset = _e.scrollY = data.pageYOffset

			_e.innerWidth = data.innerWidth
			_e.innerHeight = data.innerHeight
			_e.documentHeight = data.documentHeight
			_e.offsetWidth = data.offsetWidth
			break

		case 'resize':
			if (e instanceof Event || !data.innerWidth) {
				data.innerWidth = window.innerWidth
				data.innerHeight = window.innerHeight
				data.documentHeight = document.documentElement.clientHeight
				data.offsetWidth = document.body.offsetWidth
			}

			_e.innerWidth = data.innerWidth
			_e.innerHeight = data.innerHeight
			_e.documentHeight = data.documentHeight
			_e.offsetWidth = data.offsetWidth
			_e.offsetHeight = data.offsetHeight
			break
	}

	return _e
}

const useWindowEvent = (
	eventName: string,
	cb: (e: WindowEvent) => void,
	triggerInit = false,
	useEffectProps = [],
	debounceDelay = 40,
) => {
	useIsomorphicLayoutEffect(() => {
		const callback: any = debounceDelay ? debounce(cb, debounceDelay) : cb

		if (cb && eventName) {
			const event = events[eventName]
			if (event) {
				event.cbs.push(callback)
				if (triggerInit) {
					cb(map({type: eventName, manual: true}))
				}
			} else {
				const event: CallBackEvent = {
					cbs: [callback],
					cb: () => null,
				}
				event.cb = (e: Event) => {
					const m = map(e)
					event.cbs.forEach(ecb => {
						ecb(m)
					})
				}

				window.addEventListener(eventName, event.cb)
				events[eventName] = event
				if (triggerInit) {
					cb(map({type: eventName, manual: true}))
				}
			}
		}

		return () => {
			// cleanup event
			if (eventName) {
				const event = events[eventName]
				if (event) {
					const index = event.cbs.indexOf(callback)
					if (index !== -1) {
						if (callback.clear) callback.clear()
						event.cbs.splice(index, 1)
						if (event.cbs.length === 0) {
							window.removeEventListener(eventName, event.cb)
							events[eventName] = null
						}
					}
				}
			}
		}
	}, [eventName, ...useEffectProps])
}

export default useWindowEvent
