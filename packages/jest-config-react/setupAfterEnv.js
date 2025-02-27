require('@testing-library/jest-dom/extend-expect');
require('jest-styled-components');

const storageMock = () => {
    const storage = {};

    return {
        setItem: (key, value) => {
            storage[key] = value || '';
        },

        getItem: key => {
            return key in storage ? storage[key] : null;
        },

        removeItem: key => {
            delete storage[key];
        }
    };
};

// eslint-disable-next-line no-undef
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

/* eslint-disable */
window.localStorage = storageMock();
window.HTMLElement.prototype.scrollIntoView = function () {};

const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
