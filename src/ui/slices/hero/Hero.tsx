'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { FullscreenMedia } from '@/ui/slices'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface HeroProps {
	as?: any
	children?: ReactNode
	className?: string
}


export const Hero = ({ className }: HeroProps) => {
	const wrapper = useRef(null)

	useGSAP((context) => {
		// @ts-ignore
		const text = context.selector('.js-txt')

		const tl = gsap.timeline({
			defaults: { force3D: true, ease: 'none' },
			paused: true,
		})

		tl.to([text], {
			delay: .5,
			duration: 1.4,
			y: 0,
			ease: 'expo.out',
			stagger: .02,
		}, 0)


		tl.play()

	}, { scope: wrapper })

	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsReady(true)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	return (
		<header className={className}>
			<div className='relative w-full h-full pt-[50vh] mb-20' ref={wrapper}>
				<h1 className='flex flex-col justify-center span-w-12 mx-auto' aria-label='starter 2025'>
					<span className='text-12 uppercase leading-[.9] text-center h-[1em] overflow-clip'><span className='js-txt inline-flex translate-y-[120%]'>Starter</span> <span className='js-txt inline-flex translate-y-[120%]'>2025</span></span>
				</h1>
			</div>
			<FullscreenMedia />
		</header>
	)
}