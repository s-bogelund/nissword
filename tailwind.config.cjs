/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				crossword: '60% 40%',
			},
		},
	},
	plugins: [require('daisyui')],
};
