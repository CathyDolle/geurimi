// @ts-nocheck
export const isSafari =
	typeof window !== 'undefined'
	&& (/constructor/i.test(window.HTMLElement)
		|| (function (p) {
			return p.toString() === '[object SafariRemoteNotification]'
		})(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification)))

const ua = typeof window !== 'undefined' && window.navigator.userAgent
export const iOS = ua && (!!ua.match(/iPad/i) || !!ua.match(/iPhone/i))
export const webkit = ua && !!ua.match(/WebKit/i)
export const iOSSafari = ua && iOS && webkit && !ua.match(/CriOS/i)

export const isBrowser = typeof window !== 'undefined'
