'use client'

const touch: {current: undefined | boolean} = {current: undefined}

function useMatchTouch () {
	if (typeof window !== 'undefined' && touch.current === undefined) {
		touch.current = !window.matchMedia('(hover: hover)').matches
	}

	return touch.current
}

export default useMatchTouch
