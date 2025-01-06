/**
 * @type {import('tailwindcss').Config}
 */
export default {
	content: ['./index.html', './src/**/*.ts'],

	theme: {
		extend: {
			backgroundImage: {
				'question-panel-background': "url('/images/question-panel/question-panel__background.webp')",
				'question-panel-border': "url('/images/question-panel/question-panel__border.webp')",
				'question-panel-row': "url('/images/question-panel/question-panel__row.webp')",
			},

			colors: {
				black: '#000000',
				blue: '#060640',
				brightblue: '#0c036e',
				white: '#effeff',
			},

			fontFamily: {
				conduit: ['Conduit', 'sans-serif'],
				copperplate: ['Copperplate', 'serif'],
				nunito: ['Nunito', 'sans-serif'],
			},
		},
	},

	plugins: [],
};
