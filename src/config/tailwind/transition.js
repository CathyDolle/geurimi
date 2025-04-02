const transitionTimingFunction = {
	'quad-in': 'cubic-bezier(0.26, 0, 0.6, 0.2)',
	'cubic-in': 'cubic-bezier(0.4, 0, 0.68, 0.06)',
	'quart-in': 'cubic-bezier(0.52, 0, 0.74, 0)',
	'quint-in': 'cubic-bezier(0.64, 0, 0.78, 0)',
	'sine-in': 'cubic-bezier(0.32, 0, 0.6, 0.36)',
	'expo-in': 'cubic-bezier(0.66, 0, 0.86, 0)',
	'circ-in': 'cubic-bezier(0.54, 0, 1, 0.44)',
	'back-in': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',

	'quad-out': 'cubic-bezier(0.4, 0.8, 0.74, 1)',
	'cubic-out': 'cubic-bezier(0.34, 1.02, 0.68, 1)',
	'quart-out': 'cubic-bezier(0.26, 1.04, 0.54, 1)',
	'quint-out': 'cubic-bezier(0.22, 1.1, 0.48, 1)',
	'sine-out': 'cubic-bezier(0.4, 0.64, 0.68, 1)',
	'expo-out': 'cubic-bezier(0.16, 1.08, 0.38, 0.98)',
	'circ-out': 'cubic-bezier(0, 0.56, 0.46, 1)',
	'back-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

	'quad-inout': 'cubic-bezier(0.48, 0.04, 0.52, 0.96)',
	'cubic-inout': 'cubic-bezier(0.66, 0, 0.34, 1)',
	'quart-inout': 'cubic-bezier(0.77, 0, 0.175, 1)',
	'quint-inout': 'cubic-bezier(0.84, 0, 0.16, 1)',
	'sine-inout': 'cubic-bezier(0.36, 0, 0.64, 1)',
	'expo-inout': 'cubic-bezier(0.9, 0, 0.1, 1)',
	'circ-inout': 'cubic-bezier(0.88, 0.14, 0.12, 0.86)',
	'back-inout': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

	bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}

module.exports = transitionTimingFunction
