/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				crossword: '50% 50%',
			},
		},
	},
	plugins: [require('daisyui')],
};
