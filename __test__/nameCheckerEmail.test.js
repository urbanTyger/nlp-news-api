import { checkInput } from '../src/client/js/nameChecker.js';

test('Validate Email', () => {
    expect(checkInput("thor@avengers.com")).toBe('invalid');
});
