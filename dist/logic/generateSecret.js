export const generateSecret = (length, base, random = Math.random) => {
    const digits = '0123456789abcdef'.slice(0, base).split('');
    let avaliable = [...digits]; //копию массива данных, ограниченный до необходимой длины
    let result = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(random() * avaliable.length); //делается рандомный индекс
        result += avaliable[index];
        avaliable = avaliable.filter((element) => element !== avaliable[index]); //перезаписываем массив, чтобы не добавить случайно повторяющееся число
    }
    return result;
};
