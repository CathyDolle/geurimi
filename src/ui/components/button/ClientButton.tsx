'use client'

import { useScrollStore } from '@/stores'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { forwardRef } from 'react'
import type { PropsWithChildren, ReactElement } from 'react'
import type { ButtonProps } from './Button'

gsap.registerPlugin(ScrollToPlugin)

export const ClientButton = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, PropsWithChildren<ButtonProps>>(
	(
		{
			as = 'button',
			children,
			label,
			onClick,
			href,
			linkInput,
			tagName,
			prefetch,
			leftArrow,
			withArrow,
			withParentheses,
			anchorOffset = 0,
			...props
		}: ButtonProps,
		ref,
	): ReactElement => {
		const Tag = as
		const lenis = useScrollStore(({ lenis }) => lenis)
		const name = linkInput?.tag || tagName
		const text = name && (typeof children === 'string' ? children : typeof children?.props?.children === 'string' ? children?.props?.children : label)

		// track click event
		const handleClick = (e) => {
			onClick?.(e)

			if (href?.includes('#')) {
				// link to anchor on current page => scroll to element
				const id = href.split('#')[1]
				const anchorEl = document.getElementById(id)

				if (!anchorEl) {
					console.warn(`/ui/components/button/Button.tsx | link with anchor -> document.getElementById(${id}) is undefined`)
					return
				}
				e.preventDefault()

				gsap.killTweensOf(window)
				lenis.stop()

				const offsetTop = Math.ceil(anchorEl.getBoundingClientRect().top) + window.scrollY
				const targetPos = offsetTop - (anchorOffset || 0)
				const duration = (Math.abs(window.scrollY - offsetTop) / window.innerHeight) * 0.4 + 0.6

				gsap.to(window, {
					duration,
					ease: 'power3.inOut',
					scrollTo: targetPos,
					onComplete: () => {
						lenis.start()
					},
				})
			}
		}

		return (
			<Tag
				{...props}
				ref={ref}
				href={href}
				prefetch={prefetch}
				onClick={handleClick}
				aria-label={label}
				className={`group relative flex items-center ${props.className || ''}`}>
				{children}
			</Tag>
		)
	},
)
