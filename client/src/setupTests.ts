// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// window.scrollTo returns an error in jest so return a mock function
const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });
