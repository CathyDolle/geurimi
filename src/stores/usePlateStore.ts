import {shallow} from 'zustand/shallow'
import {createWithEqualityFn} from 'zustand/traditional'

interface PlateStoreState {
	activePlateIndex: number,
	setActivePlateIndex: (index: number) => void,
}

export const usePlateStore = createWithEqualityFn<PlateStoreState>()(
	(set) => ({
		activePlateIndex: 0,
		setActivePlateIndex: (index) => {
			set({activePlateIndex: index})
		},
	}),
	shallow,
)
