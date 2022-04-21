module.exports = {
	mode: 'jit',
	
	content: [
	  "./index.html",
	  "./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			darkblu: '#0D2D57',
			blu: '#0042A3',
			lightblu: '#006EFF',
		  },
		fontFamily: {
			'sans':  ['Nunito']
		},
	  extend: {},
	},
	plugins: [],
  }
