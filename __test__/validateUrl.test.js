import {validateUrl} from '../src/client/js/urlValidator';

describe('Url validation', () => {

    test('function should be defined', () => {
        window.alert = () => {};
        expect(validateUrl).toBeDefined();
    });

    test('a correct url should return true', () =>{
        expect(validateUrl('https://www.udacity.com')).toBeTruthy();
    });

    test('a incorrect url should trigger an alert and retrun false', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        expect(validateUrl('httdsadasps://www.udacity.com')).toBeFalsy();
        expect(window.alert).toBeCalledWith('Your input is no valid url!');
    });
});