'use client'

import { useIsomorphicLayoutEffect, useScroll } from '@/hooks'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export const GsapScrollTrigger = () => {
	useIsomorphicLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger)
	}, [])

	useScroll(() => {
		ScrollTrigger.update()
	})

	return null
}
