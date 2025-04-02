export enum DeviceEnum {
	mobile = 'mobile',
	tablet = 'tablet',
	desktop = 'desktop'
}

export enum BreakpointEnum {
	sm = 'sm',
	md = 'md',
	lg = 'lg',
	xl = 'xl',
	xxl = 'xxl',
	'sm-max' = 'sm-max',
	'lg-max' = 'lg-max'
}

export type Device = `${DeviceEnum}`
export type Breakpoint = `${BreakpointEnum}`
