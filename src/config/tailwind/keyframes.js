const keyframes = {
	blink: {
		'0%, 100%': {opacity: 1},
		'50%': {opacity: 0},
	},
	'blink-invisible': {
		'0%, 100%': {opacity: 0},
		'50%': {opacity: 1},
	},
	marquee: {
		'0%': {transform: 'translateX(0)'},
		'100%': {transform: 'translateX(-100%)'},
	},
	translateY: {
		'0%': {transform: 'translate3d(0, 100%, 0)'},
		'100%': {transform: 'translate3d(0, 0, 0)'},
	},
	'fade-in': {
		'0%': {opacity: 0},
		'100%': {opacity: 1},
	},
	loading: {
		'0%': {
			opacity: 1,
			transform: 'scale(1)',
			transformOrigin: 'top center',
		},
		'90%': {
			opacity: 0.2,
			transform: 'scale(0.6666)',
			transformOrigin: 'top center',
		},
		'100%': {
			opacity: 0.2,
			transform: 'scale(0.6666)',
			transformOrigin: 'top center',
		},
	},
	// animateIn: {
	// 	'0%': {filter: blur(5px)},
	// 	'100%': {filter: blur(0px)},
	// },
	// noise: {
	// 	'0%': {transform: 'translate3d(1%, -1%, 0)'},
	// 	'10%': {transform: 'translate3d(-5%, -2%, 0)'},
	// 	'20%': {transform: 'translate3d(10%, 5%, 0)'},
	// 	'30%': {transform: 'translate3d(5%, -11%, 0)'},
	// 	'40%': {transform: 'translate3d(-12%, -5%, 0)'},
	// 	'50%': {transform: 'translate3d(10%, 9%, 0)'},
	// 	'60%': {transform: 'translate3d(15%, 0, 0)'},
	// 	'70%': {transform: 'translate3d(-10%, 8%, 0)'},
	// 	'80%': {transform: 'translate3d(10%, 2%, 0)'},
	// 	'90%': {transform: 'translate3d(1%, 5%, 0)'},
	// 	'to': {transform: 'translate3d(0, 8%, 0)'},
	// },
}

module.exports = keyframes
