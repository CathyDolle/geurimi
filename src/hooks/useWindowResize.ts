'use client'

import useWindowEvent, {WindowEvent} from './useWindowEvent'

const useWindowResize = (
	cb: (e: WindowEvent) => void,
	triggerInit = false,
	useEffectProps = [],
	debounceDelay = 40,
) => useWindowEvent('resize', cb, triggerInit, useEffectProps, debounceDelay)

export default useWindowResize
