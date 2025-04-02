import {ElementType, ReactNode} from 'react'

import {ScrollOffset} from '@/hooks/useScrollRatio'
import {ScrollAnimationProps, ScrollAnimation} from '@/ui/components'
import {cx} from '@/utils/cx'

export interface ParallaxProps {
	children: ReactNode
	distance?: number
	useViewportRatio?: boolean
	scrollProps?: ScrollAnimationProps
	as?: ElementType
	className?: string
	offset?: ScrollOffset
	clip?: boolean
	scaleToFit?: boolean
}

export const ParallaxMedia = ({
	as = 'div',
	distance = 100,
	useViewportRatio = false,
	clip = true,
	offset = [[0.5, 0.5], [1, 0]],
	children,
	scrollProps = {},
	className,
	scaleToFit = true,
	...rest
}: ParallaxProps) => {
	const Tag = as

	return (
		<Tag {...rest} className={cx(className, clip && 'overflow-clip')}>
			<ScrollAnimation
				{...scrollProps}
				y={distance}
				useViewportRatio={useViewportRatio}
				offset={offset}
				scaleToFit={scaleToFit}>
				{children}
			</ScrollAnimation>
		</Tag>
	)
}
