'use client'

import {CSSProperties, ElementType} from 'react'
import styles from './AnimatedText.module.css'
import {useInView} from 'react-intersection-observer'
import {precision} from '@/utils/maths'
import clsx from 'clsx'

export interface SplitTextProps {
	children: string
	className?: string
	mode?: 'char' | 'word'
	tokenClassName?: string
	startIndexOffset?: number
}

export interface BaseAnimatedTextProps extends SplitTextProps {
	as?: ElementType
	className?: string
	style?: CSSProperties
}

export interface AutoAnimatedTextProps extends BaseAnimatedTextProps {
	intersection?: object
}

export interface ManualAnimatedTextProps extends BaseAnimatedTextProps {
	trigger?: boolean
}

type AnimatedTextProps = BaseAnimatedTextProps & AutoAnimatedTextProps & ManualAnimatedTextProps & {
	disabled?: boolean
};

export const SplitText = ({children, mode = 'word', className, tokenClassName, startIndexOffset = 0}: SplitTextProps) => {
	const textArr = children?.split(' ')
	let acc = startIndexOffset

	if (mode === 'char') {
		return (
			<>
				{textArr.map((word, idx) => (
					<span
						className={className}
						key={idx}>
						{word.split('').map((char, charIdx) => {
							acc += 1
							return (
								<span style={{'--reveal-token-idx': acc} as CSSProperties} key={charIdx} className={clsx('block', tokenClassName)}>{char}</span>
							)
						})}
						{idx !== (textArr.length - 1) && <span className='w-[0.2em] h-full'> </span>}
					</span>
				))}
			</>
		)
	} else {
		return (
			<>
				{textArr.map((word, idx) => (
					<span
						key={idx}
						className={className}
						style={{
							'--reveal-token-idx': idx,
							'--tokens-count': textArr.length,
						} as CSSProperties}>
						<span key={idx} className={clsx('inline-block', tokenClassName)}>{word}</span>
						{idx !== (textArr.length - 1) && <span className='w-[0.2em] h-full'> </span>}
					</span>
				))}
			</>
		)
	}
}

const tokenStyles = clsx(
	'[&>span]:whitespace-nowrap [&>span]:inline-flex',
	'[&>span]:overflow-clip [&>span]:-m-[0.15em] [&>span]:p-[0.15em]',
)

// reveal via IntersectionObserver
export const AutoAnimatedText = ({as, children, mode, intersection, className, style} : AutoAnimatedTextProps) => {
	const Tag = as as ElementType

	const {ref, inView} = useInView({
		...{
			threshold: 0,
			triggerOnce: true,
		},
		...intersection,
	})

	return (
		<Tag ref={ref} className={clsx(inView && styles.active, className, tokenStyles)} style={style}>
			<SplitText tokenClassName={styles.token} mode={mode}>{children}</SplitText>
		</Tag>
	)
}

// reveal on an external trigger
export const ManualAnimatedText = ({as, children, mode, trigger, className, style} : ManualAnimatedTextProps) => {
	const Tag = as as ElementType

	return (
		<Tag className={clsx(trigger && styles.active, className, tokenStyles)} style={style}>
			<SplitText tokenClassName={styles.token} mode={mode}>{children}</SplitText>
		</Tag>
	)
}

export const AnimatedText = ({as, disabled = false, children, trigger, mode = 'word', intersection = {}, className, style} : AnimatedTextProps) => {
	const Tag = as || 'div'

	const commonProps = {
		as: Tag, children, trigger, mode, className, style,
	}

	if (disabled) {
		// useful to programmatically switch between reveal animation
		// and normal text mode
		return <Tag className={className} style={style}>{children}</Tag>
	}

	if (trigger === undefined) {
		return (
			<AutoAnimatedText {...commonProps} intersection={intersection}>
				{children}
			</AutoAnimatedText>
		)
	} else {
		return (
			<ManualAnimatedText {...commonProps} trigger={trigger}>
				{children}
			</ManualAnimatedText>
		)
	}
}

/**
 *
 * Returns array of n paragraphs of text
 *
 */
export const splitParas = (text: string|undefined): string[] => {
	if (!text) return []
	return text?.split('\n').filter(item => item.length)
}

/**
 *
 * Returns the duration it takes for all the tokens
 * in a stagger to start appearing. Useful for
 * calculating delays with sequences of AnimatedTexts
 *
 */
export const useRevealDuration = (props: { text: string|undefined, mode?: 'char' | 'word', stagger?: number, delay?: number }): number => {
	const tokens = props.text?.split(props.mode === 'char' ? '' : ' ') || []
	const duration = (props.delay || 0) + (tokens.length * (props.stagger || 0))

	return precision(duration, 3)
}

/**
 *
 * Applies useRevealDuration to an array of texts
 * to calculate the approporiate delays
 *
 */
export const useRevealDelay = (items: { text: string|undefined, mode?: 'char' | 'word', stagger?: number, delay?: number }[]): number[] => {
	return items?.map((item, idx) => {
		if (idx === 0) return 0
		if (item.delay !== undefined) return item.delay

		const prev = items[idx - 1]

		if (!prev?.text) return 0

		const delay = useRevealDuration(prev)

		item.delay = delay

		return delay
	})
}
