'use client'
import {create} from 'zustand'

interface MenuState{
	isMenuOpen: boolean,
	setIsMenuOpen: (value: boolean) => void,
}

export const useMenuStore = create<MenuState>((set) => ({
	isMenuOpen: false,
	setIsMenuOpen: value => {
		set(() => ({
			isMenuOpen: value,
		}))
	},
}))

export default useMenuStore
