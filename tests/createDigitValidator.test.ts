import { createDigitValidator } from '../src/logic/createDigitValidator';
describe('createDigitValidator', () => {
  test('не валидный символ для десятичной системы', () => {
    const isValidDec = createDigitValidator(10);
    expect(isValidDec('a')).toBe(false);
  });

  test('валидный символ для десятичной системы', () => {
    const isValidDec = createDigitValidator(10);
    expect(isValidDec('8')).toBe(true);
  });

  test('не валидный символ для двоичной системы', () => {
    const isValidBin = createDigitValidator(2);
    expect(isValidBin('8')).toBe(false);
  });

  test('валидный символ для двоичной системы', () => {
    const isValidBin = createDigitValidator(2);
    expect(isValidBin('0')).toBe(true);
  });
});
