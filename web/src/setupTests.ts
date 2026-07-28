import '@testing-library/jest-dom';

// jsdom doesn't implement scrollTo; polyfill used by MessageList tests
if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
  if (!('scrollTo' in window.HTMLElement.prototype)) {
    (window.HTMLElement.prototype as unknown as Record<string, unknown>).scrollTo = function () {};
  }
}
