import { generateSecret } from '../src/logic/generateSecret';
describe('generateSecret', () => {
  test('возвращает строку нужной длины', () => {
    const fakeRandom = () => 0;
    const secret = generateSecret(4, 10, fakeRandom);
    expect(secret.length).toBe(4);
  });

  test('детерминированный random ', () => {
    const fakeRandom = () => 0.2;
    const first = generateSecret(4, 10, fakeRandom);
    const second = generateSecret(4, 10, fakeRandom);
    expect(first.length).toBe(4);
    expect(first).toBe(second);
  });

  //чтобы результат generateSecret был предсказуемым (принцип Repeatable из FIRST)
  test('все цифры уникальны', () => {
    const fakeRandom = () => 0.5;
    const secret = generateSecret(4, 10, fakeRandom);
    const digits = secret.split('');
    expect(digits.length).toBe(4);
    const unicDigits = new Set(digits); //убирает повторки
    expect(unicDigits.size).toBe(digits.length);
  });
});
