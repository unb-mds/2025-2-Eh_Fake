import '@testing-library/jest-dom';


require('@testing-library/jest-dom')

jest.mock('next/image', () => {
	const React = require('react')
	return {
		__esModule: true,
		default: (props) => {
			// Render a plain img and avoid passing boolean-only props like `fill`/`priority`
			const { src, alt, className, sizes } = props || {}
		
			return React.createElement('img', { src, alt, className, sizes })
		},
	}
})

jest.mock('next-themes', () => {
	const React = require('react')
	return {
		__esModule: true,
		ThemeProvider: ({ children }) => React.createElement(React.Fragment, null, children),
		useTheme: () => ({ theme: 'light', setTheme: () => {} }),
	}
})

