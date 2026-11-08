import { countPossibleSecrets } from '../src/logic/countPossibleSecrets';
describe('countPossibleSecrets', () => {
  test('P(4, 10) = 5040', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });
  test('P(2, 2) = 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });
});
