import { evaluateGuess } from '../src/logic/evaluateGuess';
describe('evaluateGuess', () => {
  test('все быки', () => {
    const result = evaluateGuess('1234', '1234');
    expect(result).toEqual({ bulls: 4, cows: 0 });
  });
  test('все коровы', () => {
    const result = evaluateGuess('1234', '4321');
    expect(result).toEqual({ bulls: 0, cows: 4 });
  });
  test('и быки и коровы', () => {
    const result = evaluateGuess('1234', '1243');
    expect(result).toEqual({ bulls: 2, cows: 2 });
  });
});
