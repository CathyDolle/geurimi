import React, {ReactNode} from 'react'
import clsx from "clsx"

interface ContainerProps {
	as?: any
	children?: ReactNode
	className?: string
}


export const Container = ({as = 'div', children, className}: ContainerProps) => {
	const Tag = as

	return (
		<Tag className={clsx(
			'grid-container',
			className,
		)}>
			{children}
		</Tag>
	)
}