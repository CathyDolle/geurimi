'use client'

import {useDevice, useScrollRatio} from '@/hooks'
import {clamp} from '@/utils/maths'
import {cx} from '@/utils/cx'
import {ReactNode, useRef} from 'react'

export interface HorizontalScrollerProps {
	children: ReactNode
	className?: string
}

export const HorizontalScroller = ({children, className}: HorizontalScrollerProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const device = useDevice(true)

	useScrollRatio(ref, (ratio) => {
		if (ref.current && device?.current) {
			if (device.current === 'desktop') {
				const r = clamp(ratio, 0, 1)
				ref.current.style.transform = `translate3d(calc(${-r} * (100% - var(--screen-width))),0,0)`
			} else {
				ref.current.style.transform = ''
			}
		}
	}, {
		offset: [[0, 0], [1, 1]],
	})

	return (
		<div ref={ref} className={cx('lg:flex lg:flex-col lg:w-max overflow-clip')}>
			<div className={cx('lg:sticky lg:top-0 lg:h-screen lg:flex lg:w-max overflow-clip', className)}>
				{children}
			</div>
			<div className='after:block after:pb-[calc(100%_-_var(--screen-height-min))] lg-max:hidden' />
		</div>
	)
}
