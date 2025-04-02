'use client'

import { type Device, DeviceEnum } from '@/types'
import { offsetTop } from '@/utils/offset'
import { type RefObject, useCallback, useRef } from 'react'
import useMatchDevice from './useMatchDevice'
import useRaf from './useRaf'
import useResizeObserver from './useResizeObserver'
import useScroll from './useScroll'
import useWindowSize, { type WindowSize } from './useWindowSize'

type UseScrollRatioCallBack = (
	ratio: number,
	options: {
		easing: number
		scrollY: number
		top: number
		height: number
		originalRatio: number
		viewport: WindowSize
	},
) => void

export type ScrollOffset = [[number, number], [number, number]]

type ScrollOptions = {
	mediaQueries?: DeviceEnum[]
	boundingClientRectRef?: RefObject<HTMLElement>
	relativeRatio?: boolean
	ease?: number
	offset: ScrollOffset // read more about it: https://motion.dev/dom/scroll#scroll-offsets
	easingFunction?: (value: number) => number
}

const defaultOptions: ScrollOptions = {
	mediaQueries: Object.values(DeviceEnum),
	relativeRatio: false,
	offset: [
		[0.5, 0.5], // Start offset [elementRatio, viewportRatio]
		[1, 0], // End offset [elementRatio, viewportRatio]
	],
	easingFunction: (value) => value,
}

const useScrollRatio = (
	ref: RefObject<HTMLElement>,
	callback: UseScrollRatioCallBack,
	options: ScrollOptions = defaultOptions,
	deps: Array<any> = [],
) => {
	options = { ...defaultOptions, ...options }

	const scrollY = useRef<number>(typeof window !== 'undefined' ? window.pageYOffset : 0)
	const enabled = useRef<boolean | null>(false)

	const viewport = useWindowSize(true)
	const ratio = useRef(0)
	const top = useRef(0)
	const width = useRef(0)
	const height = useRef(0)
	const immediate = useRef(false)

	const fromOffset = options.offset[0]
	const fromOffsetElement = fromOffset[0]
	const fromOffsetViewport = fromOffset[1]
	const toOffset = options.offset[1]
	const toOffsetElement = toOffset[0]
	const toOffsetViewport = toOffset[1]

	const device = useRef<Device | null>(null)

	useMatchDevice((detectedDevice) => {
		device.current = detectedDevice
	})

	useResizeObserver(ref, (e) => {
		width.current = e.borderBoxSize?.[0]?.inlineSize || (ref.current as HTMLElement).offsetWidth
		height.current = e.borderBoxSize?.[0]?.blockSize || (ref.current as HTMLElement).offsetHeight
		immediate.current = true
	})

	if (typeof window !== 'undefined') {
		useResizeObserver(document.body, () => {
			enabled.current = device.current && options.mediaQueries!.indexOf(device.current) !== -1
			if (enabled.current) {
				top.current = ref.current ? offsetTop(ref.current) : 0
			}
			immediate.current = true
		})
	}

	useScroll(({ animatedScroll }) => {
		scrollY.current = animatedScroll || 0
	})

	const tick = useCallback(() => {
		if (enabled.current && ref.current && viewport.current.documentHeight && height.current) {
			const easing = immediate.current ? 1 : options.ease || 1
			const fromY = fromOffsetElement * height.current - fromOffsetViewport * viewport.current.documentHeight
			const toY = toOffsetElement * height.current - toOffsetViewport * viewport.current.documentHeight
			const dY = toY - fromY
			ratio.current += ((scrollY.current! - (fromY + top.current)) / dY - ratio.current) * easing

			immediate.current = false

			callback(options?.easingFunction ? options.easingFunction(ratio.current) : ratio.current, {
				easing,
				originalRatio: ratio.current,
				scrollY: scrollY.current,
				top: top.current,
				height: height.current,
				viewport: viewport.current,
			})
		} else {
			ratio.current = 0
			callback(ratio.current, {
				originalRatio: ratio.current,
				scrollY: scrollY.current,
				top: top.current,
				height: height.current,
				viewport: viewport.current,
			})
		}
	}, deps)
	useRaf(tick)
}

export default useScrollRatio
