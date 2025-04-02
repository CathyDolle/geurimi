'use client'

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

const useMatchMedia = (queries: Array<string>, callback: (e: MediaQueryListEvent | MediaQueryList) => string | undefined) => {
	const handleChange = (e: MediaQueryListEvent): void => {
		callback(e)
	}

	useIsomorphicLayoutEffect(() => {
		const mediaQueryLists: Array<MediaQueryList> = queries.map((q: string) => window.matchMedia(q))

		mediaQueryLists.forEach(mq => {
			mq.addEventListener('change', handleChange)
			if (mq.matches) callback(mq)
		})
		return (): void =>
			mediaQueryLists.forEach(mq => mq.removeEventListener('change', handleChange))
	}, [])
}

export default useMatchMedia
