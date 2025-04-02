import {useScrollStore} from '@/stores'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export default function useScroll (callback, deps = []) {
	const lenis = useScrollStore(({lenis}) => lenis)

	useIsomorphicLayoutEffect(() => {
		const handleScroll = args => {
			// eslint-disable-next-line n/no-callback-literal
			if (!lenis.__isStopped) callback(args)
		}

		if (!lenis) return
		lenis.on('scroll', handleScroll)

		callback(lenis)

		return () => {
			lenis.off('scroll', handleScroll)
		}
	}, [lenis, callback, [...deps]])
}
