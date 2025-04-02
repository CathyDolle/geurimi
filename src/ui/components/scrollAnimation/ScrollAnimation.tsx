'use client'

import {ElementType, forwardRef, ReactNode, useCallback, useRef} from 'react'
import {useDevice, useMatchTouch, useScrollRatio} from '@/hooks'
import {DeviceEnum} from '@/types'
import {precision} from '@/utils/maths'
import {ScrollOffset} from '@/hooks/useScrollRatio'
import {WindowSize} from '@/hooks/useWindowSize'

export interface ScrollAnimationProps {
	children?: ReactNode
	speed?: number
	// https://motion.dev/dom/scroll#scroll-offsets
	offset?: ScrollOffset
	x?: number
	y?: number
	useViewportRatio?: boolean
	scaleToFit?: boolean
	scaleInit?: number
	rotateInit?: number
	rotate?: number
	className?: string
	unit?: string
	easingFunction?: (value: number) => number
	transform?: (
		transform: {
			x: number
			y: number
			rotate: number
		},
		props: {
			ratio: number
			height: number
			top: number
			viewport: WindowSize
			inView: boolean
			enabled: boolean
		}
	) => string
	mediaQueries?: DeviceEnum[]
	disableTouchDevice?: boolean,
	as?: ElementType
}

export const ScrollAnimation = forwardRef((
	{
		children,
		useViewportRatio,
		scaleToFit,
		offset = [[0.5, 0.5], [1, 0]],
		x = 0,
		y = 0,
		scaleInit = 1,
		rotateInit = 0,
		rotate = 0,
		className,
		easingFunction = value => value,
		transform,
		mediaQueries = Object.values(DeviceEnum),
		as = 'div',
		unit = 'px',
		disableTouchDevice = true,
	}: ScrollAnimationProps,
	ref,
) => {
	const Tag = as
	const localRef = useRef<HTMLElement | null>(null)
	const setRefs = useCallback((e: HTMLElement) => {
		localRef.current = e
		// @ts-ignore
		if (ref) ref.current = e
	}, [])

	const disable = disableTouchDevice ? useMatchTouch() : false

	if (disable === false) {
		const angle = useRef(rotateInit)
		const _height = useRef(0)
		const _x = useRef(0)
		const _y = useRef(0)
		const prevX = useRef<number | null>(null)
		const prevY = useRef<number | null>(null)
		const needsClean = useRef(false)
		const device = useDevice(true)

		useScrollRatio(
			// @ts-ignore
			localRef,
			(ratio, {scrollY, top, height, viewport, originalRatio}) => {
				_height.current = height
				// if (!tl.current) init(viewport)

				// @ts-ignore
				const enabled = mediaQueries.includes(device?.current) && disable === false
				if (!enabled) {
					// tl.current?.stop()
					return false
				}

				const dx = useViewportRatio ? x * viewport.innerWidth : x
				const dy = useViewportRatio ? y * viewport.documentHeight : y
				let scale = scaleInit
				if (scaleToFit) {
					const dTotal = 2 * dy
					const scrollDistance = (viewport.documentHeight - height) / 2
					const scrollDistanceTotal = viewport.documentHeight + height
					const deltaD = (scrollDistance * dTotal) / scrollDistanceTotal
					scale += Math.max(1, (height + deltaD * 2) / height) - 1
				}

				const initY = top - scrollY
				const vpHeight = viewport.documentHeight

				_x.current = ratio * (x !== undefined ? x : 0) * (useViewportRatio ? Math.abs(dx) : 1)
				_y.current = ratio * (y !== undefined ? y : 0) * (useViewportRatio ? Math.abs(dy) : 1)

				if (rotate || rotateInit) {
					const destRotation = (-rotate * initY) / vpHeight + rotateInit
					angle.current = destRotation
				}

				const t = {
					x: precision(_x.current),
					y: precision(_y.current),
					rotate,
				}

				const newY = initY + _y.current

				const inView =
				(newY + height >= 0 && newY <= vpHeight)
				|| (initY + height >= 0 && initY <= vpHeight)

				const props = {
					ratio,
					originalRatio,
					ref: localRef,
					top,
					height,
					viewport,
					inView,
					enabled: false,
				}

				const rotateTransformation = angle.current ? ` rotate(${angle.current}deg)` : ''

				if (localRef.current && inView && (t.x !== prevX.current || t.y !== prevY.current)) {
					localRef.current.style.transform = transform
						? transform(t, {...props, enabled: true})
						: `translate3d(${t.x}${unit},${t.y}${unit},0)${rotateTransformation} scale(${scale})`
					localRef.current.style.willChange = 'transform'
					needsClean.current = true
				} else if (localRef.current && !inView && needsClean.current) {
					localRef.current.style.transform = transform
						? transform(t, props)
						: `translate(${t.x}${unit},${t.y}${unit})${rotateTransformation} scale(${scale})`
					localRef.current.style.willChange = ''
					needsClean.current = false
				}

				prevX.current = t.x
				prevY.current = t.y
			},
			{offset, easingFunction, mediaQueries},
			[x, y, transform, easingFunction],
		)
	}

	return (
		<Tag ref={setRefs} className={className}>
			{children}
		</Tag>
	)
})
