import React, {ReactNode} from 'react'
import { Container } from '@/ui/components'
import { ScrollAnimation } from '@/ui/components/scrollAnimation/ScrollAnimation'
import { cx } from '@/utils/cx'

interface FooterProps {
	className?: string
}


export const Footer = ({className}: FooterProps) => {
	return (
		<footer className={cx('bg-black relative z-99 uppercase text-white overflow-clip', className)}>
			<Container className='py-100'>
				<h2 className='text-12 opacity-50 uppercase text-center'>Footer - Starter 2025</h2>
			</Container>
		</footer>
	)
}