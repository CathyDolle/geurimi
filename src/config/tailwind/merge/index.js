import {createTailwindMerge, getDefaultConfig, mergeConfigs} from 'tailwind-merge'

const getTwMergeConfig = () => {
	const config = getDefaultConfig()

	return mergeConfigs(config, {
		classGroups: {
			'font-size': [{text: [(value) => Number(value)]}],
		},
	})
}

export const twMergeConfig = getTwMergeConfig()
export const twMerge = createTailwindMerge(getTwMergeConfig)
