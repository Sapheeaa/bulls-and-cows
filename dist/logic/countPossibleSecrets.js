const cache = new Map();
export const countPossibleSecrets = (length, base) => {
    const mapKey = `${length}-${base}`;
    if (cache.has(mapKey)) {
        return cache.get(mapKey);
    }
    let result;
    if (length === 0) {
        result = 1;
    }
    else {
        result = base * countPossibleSecrets(length - 1, base - 1);
    }
    cache.set(mapKey, result);
    return result;
};
