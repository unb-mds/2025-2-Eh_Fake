import '@testing-library/jest-dom';

// Jest setup file - add lightweight mocks for Next.js modules used in tests
// Enable testing-library DOM matchers (toBeInTheDocument, toHaveClass, etc.)
require('@testing-library/jest-dom')
// Mock next/image to render a normal <img/> in the test environment
jest.mock('next/image', () => {
	const React = require('react')
	return {
		__esModule: true,
		default: (props) => {
			// Render a plain img and avoid passing boolean-only props like `fill`/`priority`
			const { src, alt, className, sizes } = props || {}
			// eslint-disable-next-line jsx-a11y/alt-text
			return React.createElement('img', { src, alt, className, sizes })
		},
	}
})

// Optionally mock next-themes ThemeProvider to simply render children in tests
jest.mock('next-themes', () => {
	const React = require('react')
	return {
		__esModule: true,
		ThemeProvider: ({ children }) => React.createElement(React.Fragment, null, children),
		useTheme: () => ({ theme: 'light', setTheme: () => {} }),
	}
})

