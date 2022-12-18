/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				crossword: '62% 38%',
			},
		},
	},
	plugins: [require('daisyui')],
};
