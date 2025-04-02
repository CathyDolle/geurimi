'use client'

import {useEffect} from 'react'

type Callback = (elapsed: number, delta: number) => void
type Param = {
	callback: Callback
	fps?: number
	lastDelta: number
}

const callbacks: Array<Param> = []
let request: number | null = null
let lastFrameTime = 0
const threshold = 0.9

const tick = (time: number) => {
	const delta = time - lastFrameTime

	callbacks.forEach(param => {
		const interval = param.fps ? 1000 / param.fps : 0
		if (param.lastDelta + delta >= interval * threshold) {
			param.callback(time, param.lastDelta + delta)
			param.lastDelta = 0
		} else {
			param.lastDelta += delta
		}
	})

	lastFrameTime = time
	request = window.requestAnimationFrame(tick)
}

const useRaf = (callback: Callback, prio = false, fps?: number) => {
	const param = {
		callback,
		fps,
		lastDelta: 0,
	}

	useEffect(() => {
		if (prio) callbacks.unshift(param)
		else callbacks.push(param)

		if (request === null) {
			lastFrameTime = 0
			request = window.requestAnimationFrame(tick)
		}

		return () => {
			const index = callbacks.indexOf(param)
			if (index !== -1) callbacks.splice(index, 1)
			if (!callbacks.length) {
				if (request) window.cancelAnimationFrame(request)
				request = null
			}
		}
	}, [callback, prio])
}

export default useRaf
