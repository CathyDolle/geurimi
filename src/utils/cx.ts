import {twMerge, twMergeConfig} from '@/config/tailwind/merge'
import {tv as nativeTv} from 'tailwind-variants'

export const cx = (...args) => twMerge(...args) || undefined
export const tv: typeof nativeTv = (options, config) => nativeTv(options, {...config, twMergeConfig})
