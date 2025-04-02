'use client'

import useMatchMedia from './useMatchMedia'
import {screens, devices} from '@/config/dist/theme'
import type {Device} from '@/types/device'

type Callback = (device: Device) => void

const useMatchDevice = (callback: Callback) => {
	const queries = {
		mobile: `(max-width: ${screens[devices.tablet.screen] - 1}px)`,
		tablet: `(min-width: ${screens[devices.tablet.screen]}px) and (max-width: ${
			screens[devices.desktop.screen] - 1
		}px)`,
		desktop: `(min-width: ${screens[devices.desktop.screen]}px)`,
	}

	const entries = Object.entries(queries)

	useMatchMedia(
		entries.map(e => e[1]),
		(e: MediaQueryListEvent | MediaQueryList) => {
			if (e.matches) {
				const result = entries.find(v => v[1] === e.media)?.[0]
				if (!result) {
					console.warn('no device match found')
				}
				callback(result || 'desktop')

				return result || 'desktop'
			}
		},
	)
}

export default useMatchDevice
