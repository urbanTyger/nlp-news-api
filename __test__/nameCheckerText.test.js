import { checkInput } from '../src/client/js/nameChecker.js';

test('Validate Text', () => {
    expect(checkInput("The beginning of the end")).toBe('txt');
});

test('Validate Text Length', () => {
    expect(checkInput("The")).toBe('invalid');
});
