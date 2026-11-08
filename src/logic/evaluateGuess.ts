export const evaluateGuess = (secret: string, guess: string) => {
  const secretArr = secret.split('');
  const gessArr = guess.split('');
  const bulls = secretArr.filter((_, i) => secretArr[i] === gessArr[i]).length;

  const secretWithoutBulls = secretArr.filter((_, i) => secretArr[i] !== gessArr[i]);
  const gessWithoutBulls = gessArr.filter((_, i) => gessArr[i] !== secretArr[i]);

  const cows = gessWithoutBulls.filter((item) => secretWithoutBulls.includes(item)).length;
  return { bulls, cows };
};
