'use client'

import cx from "clsx"
import {useEffect, useState} from 'react'
import {Container} from '@/ui/components'

export interface GridProps {
	//
}

export const Grid = () => {
	if (process.env.NODE_ENV !== 'development') return null

	const [isVisible, setIsVisible] = useState(true)

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'g') {
			setIsVisible(!isVisible)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isVisible])

	return (
		<div className='fixed inset-0 w-full h-full z-[999] pointer-events-none'>
			<Container className='h-full flex flex-row gutter-gap-1'>
				{Array.from({length: 12}).map((_, i) => (
					<div
						key={i}
						className={cx(
							'lg-max:hidden span-w-1 h-full bg-red bg-opacity-10',
							'transition-transform duration-500 ease-in-out origin-top',
							!isVisible ? 'scale-y-0' : 'scale-y-full',
						)} />
				))}

				{Array.from({length: 6}).map((_, i) => (
					<div
						key={i}
						className={cx(
							'lg:hidden span-w-1 h-full bg-red bg-opacity-10',
							'transition-transform duration-500 ease-in-out origin-top',
							!isVisible ? 'scale-y-0' : 'scale-y-full',
						)} />
				))}
			</Container>
		</div>
	)
}
