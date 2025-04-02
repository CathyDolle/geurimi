'use client'

import { useEffect } from 'react'
import { useScrollStore } from '@/stores'
import { useIsomorphicLayoutEffect, useRaf } from '@/hooks'
import { shallow } from 'zustand/shallow'

export const Lenis = () => {
	const lenis = useScrollStore(state => state.lenis, shallow)

	// @ts-ignore
	useRaf(time => !lenis?.__isStopped && lenis?.raf(time), true)

	useEffect(() => {
		// not great for scroll restoration, but lenis is buggy on page switch while scrolling
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		}
	}, [])

	if (process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useIsomorphicLayoutEffect(() => {
			const sbw = window.innerWidth - document.documentElement.offsetWidth
			document.documentElement.style.setProperty('--sbw', `${sbw}px`)
		}, [])

		return null
	} else {
		return (
			<script dangerouslySetInnerHTML={{
				__html: `document.documentElement.style.setProperty('--sbw', window.innerWidth - document.body.offsetWidth + 'px');`,
			}} />
		)
	}
}
