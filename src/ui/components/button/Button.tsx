import { cx, tv } from '@/utils/cx'
import Link from 'next/link'
import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactElement, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { ClientButton } from './ClientButton'

const shared = [
	'inline-flex items-center justify-center text-center',
	'font-serif h-44 font-medium bg-none px-24 rounded-sm',
	'transition-[opacity,color,background] duration-1000 hover:duration-100 ease-expo-out',
	'[&>span]:transition-transform [&>span]:duration-700 [&>span]:ease-expo-out [&>span]:gap-x-6 [&>span]:items-center [&>span]:inline-flex [&>span]:items-center [&>span]:justify-center [&>span]:h-full [&>span]:w-auto [&>span]:pointer-events-none [&>span]:transform-gpu [&>span]:ease-expo-out',
]

export const buttonStyles = tv({
	base: [
		'appearance-none cursor-pointer font-serif overflow-clip',
		'disabled:pointer-events-none',
		// styles when using tab key to focus
		'focus-visible:outline',
	],
	variants: {
		theme: {
			dark: [],
			light: [],
		},
		variant: {
			none: 'inline-block',
			// filled
			primary: [...shared],
			critical: [...shared, 'bg-red text-white'],
			// outline
			secondary: [...shared, 'border'],
			header: ['text-40 lg:!text-16 transition-all duration-1000 hover:duration-100 ease-expo-out hover:opacity-60'],
			alt: [...shared, 'bg-black text-white px-12 py-11 border border-black', 'hover:bg-white hover:text-black'],
			classicUnderlined: ['inline-flex underline uppercase text-11 font-reproMono'],
			fade: ['transition-[color] !text-14 lg:!text-16 duration-1000 hover:duration-100 ease-expo-out overflow-visible'],
			arrowHover: ['group relative text-white-60', 'hover:text-white', 'transition-all duration-1000 hover:duration-100 ease-expo-out'],
			underlined: [
				'relative inline-block',
				'after:absolute after:bottom-0 after:left-0',
				'after:w-full after:h-2',
				'after:bg-current',
				'after:scale-x-0 after:hover:scale-x-100 after:focus-visible:scale-x-100 after:origin-left',
				'after:transition-transform after:duration-500 after:ease-expo-out after:transform-gpu',
			],
			solidUnderlined: [
				'relative inline-block text-11 uppercase font-mono pb-4',
				// before - visible line, exits to right
				'before:absolute before:bottom-0 before:right-0',
				'before:w-full before:h-1',
				'before:bg-current',
				'before:scale-x-100 before:hover:scale-x-0 before:origin-right',
				'before:transition-transform before:duration-1000 before:ease-expo-out before:transform-gpu',
				'before:delay-75 before:hover:delay-0',
				// after - hover line, enters from left
				'after:absolute after:bottom-0 after:left-0',
				'after:w-full after:h-1',
				'after:bg-current',
				'after:scale-x-0 after:hover:scale-x-100 after:origin-left',
				'after:transition-transform after:duration-1000 after:ease-expo-out after:transform-gpu',
				'after:hover:delay-75',
			],
			filter: [
				'relative font-rapid text-16 uppercase',
				'px-12 py-2',
				'before:absolute before:inset-0 before:scale-75 before:-z-1 before:rounded-[30px] before:opacity-0',
				'hover:before:scale-100 hover:before:opacity-100 before:transition-[transform,opacity] before:duration-500 before:ease-expo-out',
			],
		},
		active: {
			true: '',
		},
		disabled: {
			true: 'opacity-50 pointer-events-none',
		},
	},
	compoundVariants: [
		{
			variant: 'primary',
			theme: 'dark',
			class: 'bg-blue text-white',
		},
		{
			variant: 'primary',
			theme: 'light',
			class: 'bg-white text-blue',
		},
		{
			variant: 'secondary',
			theme: 'dark',
			class: 'text-blue border-blue',
		},
		{
			variant: 'underlined',
			active: true,
			class: 'after:scale-x-100 after:hover:scale-x-0 after:origin-right',
		},
		{
			variant: 'critical',
			disabled: true,
			class: 'opacity-100',
		},
		{
			variant: 'filter',
			active: true,
			class: 'before:scale-100 before:opacity-100',
		},
		{
			variant: 'fade',
			theme: 'dark',
			class: 'text-white/60 hover:text-white',
		},
		{
			variant: 'fade',
			theme: 'light',
			class: 'text-black/60 hover:text-black',
		},
	],
})

type ButtonVariants = VariantProps<typeof buttonStyles>

export type ButtonProps = HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> &
	ButtonVariants & {
		as?
		children?: ReactNode
		className?: string
		activeClassName?: string
		linkInput?: string
		href?: string
		target?: string
		prefetch?: boolean
		shallow?: boolean
		scroll?: boolean
		download?: boolean
		type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
		/** `aria-label` for a11y. */
		label?: string
		tagName?: string
		withArrow?: boolean
		withParentheses?: boolean
		leftArrow?: boolean
		anchorOffset?: number
	}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement, PropsWithChildren<ButtonProps>>(
	(
		{
			target,
			as = 'button',
			children,
			className,
			active,
			activeClassName,
			onClick,
			linkInput,
			href,
			disabled,
			label,
			variant = 'none',
			theme = 'dark',
			prefetch = false,
			shallow,
			scroll,
			download,
			tagName,
			...props
		}: ButtonProps,
		ref,
	): ReactElement => {
		const Tag = as

		const classNames = [buttonStyles({ ...props, variant, theme, active, disabled }), className, active && activeClassName]

		if (href) {
			const _target = target || (href.indexOf('mailto:') === 0 || href.indexOf('http') === 0 ? '_blank' : undefined)
			return (
				<ClientButton
					as={Link}
					ref={ref as Ref<HTMLAnchorElement> | undefined}
					href={href}
					target={_target}
					className={cx(classNames)}
					onClick={onClick}
					prefetch={prefetch}
					shallow={shallow}
					scroll={scroll}
					download={download}
					label={label}
					linkInput={linkInput}
					tagName={tagName}
					{...props}>
					{children || label}
				</ClientButton>
			)
		}

		return (
			<ClientButton
				ref={ref}
				as={Tag}
				className={cx(classNames)}
				disabled={disabled}
				onClick={onClick}
				label={label}
				tagName={tagName}
				{...props}>
				{children || label}
			</ClientButton>
		)
	},
)
