export const createDigitValidator = (base) => (char) => {
    const digits = '0123456789abcdef'.slice(0, base).split('');
    const normalized = char.toLowerCase();
    return normalized.length === 1 && digits.includes(normalized);
};
