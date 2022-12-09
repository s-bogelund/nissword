/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				crossword: '66% 34%',
			},
		},
	},
	plugins: [require('daisyui')],
};
