import {handleSubmit} from '../src/client/js/formHandler.js';

describe('Form handling', () => {
    test('function handleSubmit should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });
});