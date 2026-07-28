import '@testing-library/jest-dom';

// jsdom doesn't implement scrollTo; polyfill used by MessageList tests
if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
	// @ts-ignore
	if (!window.HTMLElement.prototype.scrollTo) {
		// @ts-ignore
		window.HTMLElement.prototype.scrollTo = function () {};
	}
}
