import { checkInput } from '../src/client/js/nameChecker.js';
// import { handleSubmit } from './js/formHandler';


test('Validate URL', () => {
    expect(checkInput("www.google.com")).toBe('url');
});
