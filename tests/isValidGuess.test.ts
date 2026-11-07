import { isValidGuess } from '../src/logic/isValidGuess';
describe('isValidGuess', () => {
  test('неправильная длина', () => {
    expect(isValidGuess('123', 7, 10)).toBe(false);
  });
  test('правильная длина', () => {
    expect(isValidGuess('123', 3, 10)).toBe(true);
  });
  test('недопустимыый символ', () => {
    expect(isValidGuess('1abc', 4, 10)).toBe(false);
  });
  test('дублирование', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });
});
