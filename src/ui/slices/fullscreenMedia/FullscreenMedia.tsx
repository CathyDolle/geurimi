import { ParallaxMedia, Container } from "@/ui/components"
import Image from "next/image"
import Cover from '@/assets/images/placeholder.jpeg'

export const FullscreenMedia = () => {
	return (
		<section className='h-screen w-full relative grid grid-cols-1 grid-rows-1'>
			<ParallaxMedia 
				distance={0.5}
				useViewportRatio
				className='col-start-1 row-start-1 h-full w-full'
				scrollProps={{
					className: 'w-full h-full',
				}}>
				{/* <figure className='w-full h-full'> */}
					<Image src={Cover} alt='hero' fill className='object-cover w-full h-full' />
				{/* </figure> */}
			</ParallaxMedia>
			<Container className='relative z-2 col-start-1 row-start-1 grid place-items-center'>
				<h2 className="text-12 uppercase">Fullscreen Media</h2>
			</Container>
		</section>
	)
}