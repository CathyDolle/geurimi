'use client'

import {useEffect, useLayoutEffect as vanillaUseLayoutEffect} from 'react'
import {isBrowser} from '@/utils/browser'

export const useLayoutEffect = isBrowser ? vanillaUseLayoutEffect : useEffect

export default useLayoutEffect
