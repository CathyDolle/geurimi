'use client'

import {Device, DeviceEnum} from '@/types'
import {useRef, useState} from 'react'
import useMatchDevice from './useMatchDevice'

const useDevice = (asRef = false) => {
	const deviceRef = useRef<Device | null>(null)
	const [device, setDevice] = useState<Device | null>(null)

	useMatchDevice((device: Device) => {
		if (device in DeviceEnum) {
			deviceRef.current = device
			if (!asRef) setDevice(device)
		}
	})

	if (asRef) {
		return deviceRef
	} else {
		return device
	}
}

export default useDevice
