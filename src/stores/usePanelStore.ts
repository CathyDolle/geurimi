'use client'
import {create} from 'zustand'

interface PanelState{
	isPanelOpen: boolean,
	setIsPanelOpen: (value: boolean) => void,
}

export const usePanelStore = create<PanelState>((set) => ({
	isPanelOpen: false,
	setIsPanelOpen: value => {
		set(() => ({
			isPanelOpen: value,
		}))
	},
}))

export default usePanelStore
