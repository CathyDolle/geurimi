'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useResizeObserver } from '@/hooks/'
import { cx } from '@/utils/cx'

export interface AccordionProps {
	className?: string
	headingClassName?: string
	contentClassName?: string
	isExpanded?: boolean
	heading: React.ReactNode
	content: React.ReactNode
}

export const Accordion = ({ className, headingClassName, contentClassName, isExpanded, heading, content }: AccordionProps) => {
	const [open, setOpen] = useState(isExpanded)
	const [animated, setAnimated] = useState(false)
	const wrapperRef = useRef(null)
	const contentRef = useRef(null)

	const setSize = useCallback(() => {
		// @ts-ignore
		wrapperRef.current.style.height = open ? wrapperRef.current.scrollHeight + 'px' : 0
	}, [open])

	useEffect(setSize, [open])
	// @ts-ignore
	useResizeObserver(contentRef, setSize)

	useEffect(() => {
		setAnimated(true)
	}, [])

	useEffect(() => {
		setOpen(isExpanded)
	}, [isExpanded])

	return (
		<div className={cx(className)}>
			<button
				aria-expanded={open}
				className={cx(headingClassName, 'py-20')}
				onClick={() => setOpen(!open)}>
				<span className='text-20'>
					{heading}
				</span>
			</button>
			<div
				ref={wrapperRef}
				className={cx(
					'overflow-hidden transition-all duration-300 ease-in-out',
					open ? 'h-auto' : 'h-0'
				)}>
				<div ref={contentRef} className={cx(contentClassName)}>{content}</div>
			</div>
		</div>
	)
}