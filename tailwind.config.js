/**
 * @type {import('tailwindcss').Config}
 */
export default {
	content: ['./index.html', './src/**/*.ts'],

	theme: {
		extend: {
			colors: {
				black: '#000000',
				blue: '#060640',
				brightblue: '#0c036e',
			},

			fontFamily: {
				copperplate: ['Copperplate', 'serif'],
				nunito: ['Nunito', 'sans-serif'],
				verdana: ['Verdana', 'sans-serif'],
			},
		},
	},

	plugins: [],
};
