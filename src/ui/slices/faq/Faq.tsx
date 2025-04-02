import { Container, Accordion } from '@/ui/components'

export const Faq = () => {
	return (
		<section className='my-100'>
			<Container>
				<h2 className='text-40 span-ml-2 mb-40'>FAQ</h2>

				<div className='span-w-6 span-ml-2 flex flex-col gap-20'>
					<Accordion
						heading='What is the purpose of this website?'
						content='This website is a platform for sharing knowledge and information.'
					/>
					<Accordion
						heading='What is the purpose of this website?'
						content='This website is a platform for sharing knowledge and information.'
					/>
				</div>
			</Container>
		</section>
	)
}