/**
 * @type {import('tailwindcss').Config}
 */
export default {
	content: ['./index.html'],

	theme: {
		extend: {
			colors: {
				black: '#000000',
				blue: '#060640',
				white: '#effeff',
			},

			fontFamily: {
				copperplate: ['Copperplate', 'serif'],
				verdana: ['Verdana', 'sans-serif'],
			},
		},
	},
};
