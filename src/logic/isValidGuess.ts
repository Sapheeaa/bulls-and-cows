import { describe, test, expect } from '@jest/globals';
import { createDigitValidator } from './createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const isValidDigit = createDigitValidator(base);
  const digits = guess.split('');
  return (
    guess.length === length && //совпадает длина
    digits.every(isValidDigit) &&
    new Set(digits).size === digits.length //так как нельзя сравнить напрямую, то через длины
  );
};
