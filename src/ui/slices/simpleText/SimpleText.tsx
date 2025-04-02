'use client'

import { AnimatedText, AutoAnimatedText, Container } from "@/ui/components"
import { CSSProperties } from "react"
import { useInView } from "react-intersection-observer"

export const SimpleText = () => {
	const [titleRef, inViewTitle] = useInView({
		threshold: 0.4,
		triggerOnce: true,
	})
	return (
		<section className='h-screen w-full grid place-items-center text-black bg-white'>
			<Container>
			<div className="span-w-5 mx-auto text-center" ref={titleRef}>
				<AnimatedText
					as={'h3'}
					mode='word'
					trigger={inViewTitle}
					style={{
						'--reveal-start': '110%',
						'--reveal-stagger': 0.01,
					} as CSSProperties}
					className='ease-expo-out duration-100 text-16 uppercase leading-[1.2]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam odio labore, eum itaque omnis optio! Aperiam sit deleniti aspernatur dolore, debitis atque ut. Officia esse accusamus fuga nostrum corporis velit!
					Tempore, aliquid voluptate? Voluptas, nostrum sunt. Nobis officiis fuga saepe laudantium odio neque qui explicabo doloribus nemo blanditiis. Perspiciatis accusamus consequatur labore, incidunt consequuntur nemo fugiat animi maiores laboriosam quisquam!
					Quasi quibusdam adipisci voluptate perferendis sit! Vitae facere quam doloremque quae, cupiditate, molestiae officia error tenetur eum repudiandae, et beatae hic! Rerum unde itaque soluta nostrum iusto quia eveniet officiis.
					</AnimatedText>
				</div>
			</Container>
		</section>)
}
