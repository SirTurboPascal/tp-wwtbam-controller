/**
 * @type {import('tailwindcss').Config}
 */
export default {
	content: ['./index.html', './src/**/*.ts'],

	theme: {
		extend: {
			backgroundImage: {
				'answer-panel-background': "url('/images/answer-panel/answer-panel__background.webp')",
				'answer-panel-background--final': "url('/images/answer-panel/answer-panel__background--final.webp')",
				'answer-panel-border': "url('/images/answer-panel/answer-panel__border.webp')",
				'answer-panel-row': "url('/images/answer-panel/answer-panel__row.webp')",
				'question-panel-background': "url('/images/question-panel/question-panel__background.webp')",
				'question-panel-border': "url('/images/question-panel/question-panel__border.webp')",
				'question-panel-row': "url('/images/question-panel/question-panel__row.webp')",
			},

			colors: {
				black: '#000000',
				blue: '#060640',
				brightblue: '#0c036e',
				orange: '#d89f4d',
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
