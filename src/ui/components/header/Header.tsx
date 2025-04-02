'use client'

import {useRef, useState} from 'react'
import {useScroll, useWindowSize} from '@/hooks'
import { cx } from '@/utils/cx'

interface HeaderProps {
	//
}

export const Header = ({
	//
}: HeaderProps) => {
	const [isOpened, setIsOpened] = useState(false)
	const [isBackgroundShown, setIsBackgroundShown] = useState(false)
	const [isHidden, setIsHidden] = useState(false)
	const windowSize = useWindowSize(true)
	const savedScroll = useRef(0)
	const prevScroll = useRef(0)
	const isPortrait = useRef(false)
	const openMenuRef = useRef(null)
	const closeMenuRef = useRef(null)

	//@ts-ignore
	useScroll(({animatedScroll}) => {
		const MAX = 200
		const direction = animatedScroll - prevScroll.current
		prevScroll.current = animatedScroll

		if (direction > 0) savedScroll.current = animatedScroll
		const deltaScroll = savedScroll.current - animatedScroll

		const isShown = animatedScroll >= (windowSize.current?.documentHeight || 0) * 0.4
		if (isBackgroundShown !== isShown) setIsBackgroundShown(isShown)

		if (isPortrait.current) return

		if (direction > 0 && !isHidden && !isOpened && animatedScroll > windowSize.current.documentHeight * 0.2) {
			setIsHidden(true)
		} else if (isHidden && direction < -1) {
			if (deltaScroll > MAX) {
				setIsHidden(false)
			}
		}
	})

	const handleClickMenu = () => {
		const newOpen = !isOpened
		setTimeout(() => {
			if (newOpen) {
				// @ts-ignore
				closeMenuRef.current?.focus()
			} else {
				// @ts-ignore
				openMenuRef.current?.focus()
			}
		}, 100)
		setIsOpened(newOpen)
	}

	const handleClickLink = () => {
		if (isOpened) setIsOpened(false)
	}

	return (
		<>
			<header
				id='header'
				className={cx(
					'fixed z-[999] left-0 right-0 top-0 flex justify-center',
					'text-black',
					isHidden && !isOpened && '-translate-y-full',
					'text-12 uppercase',
					'transition-[color,transform] duration-[300ms,1000ms] ease-expo-out',
					isOpened || isHidden ? 'delay-[0s]' : 'delay-[300ms,0s]',
					'after:absolute after:z-0 after:left-0 after:bottom-full after:w-full after:h-full',
					'after:!opacity-100',
					'after:transition-transform after:duration-700',
					'after:translate-y-full after:ease-expo-out',
					'pointer-events-none',
				)}>
				<nav aria-label='Main Navigation' className='w-full'>
					<div className={cx(
						'relative z-20 py-5 lg:py-10 flex items-center justify-between w-full margin-px-1',
					)}>
						<div className='flex-[1] duration-700 ease-expo-out'>
							<div className='relative pointer-events-none'>
								<span className={cx('relative block pointer-events-none overflow-clip')}>
									<button
										ref={openMenuRef}
										onClick={handleClickMenu}
										className={cx(
											'relative text-12 pointer-events-auto overflow-visible border-10 border-transparent',
											'transition-transform duration-700 ease-expo-out',
											isOpened ? '-translate-y-full' : '-translate-y-0',
										)}>
										Menu
									</button>
									<button
										ref={closeMenuRef}
										onClick={handleClickMenu}
										className={cx(
											'text-12 !text-black pointer-events-auto !absolute left-10 top-[125%] -translate-x-10 border-10 border-transparent  ',
											'transition-[transform,visibility] duration-700 ease-expo-out',
											isOpened ? 'visible' : 'invisible',
											isOpened && '-translate-y-full',
										)}>
										Close
									</button>
								</span>
							</div>
						</div>
					</div>
				</nav>
			

				<div className={cx(
					'fixed z-10 top-0 left-0 w-full py-120 bg-white text-black',
					'transition-transform duration-[1s]',
					'flex items-center justify-center',
					isOpened ? 'translate-y-0 ease-expo-out' : '-translate-y-full ease-quart-inout',
				)}>
					<span className={cx(
						'text-20 uppercase',
						'transition-transform duration-[1s] ease-expo-out',
						isOpened ? 'translate-y-0 ease-expo-out' : 'translate-y-full ease-quart-inout',
					)}>Menu panel</span>
				</div>
			</header>
			<div
				aria-hidden
				onClick={handleClickLink}
				className={cx(
					'fixed z-99 bg-black/50 inset-0 cursor-pointer',
					'transition-[opacity,visibility] duration-1000 ease-quart-out',
					!isOpened && 'opacity-0 pointer-events-none invisible',
				)} />
		</>
	)
}
