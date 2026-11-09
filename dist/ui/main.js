import { generateSecret } from '../logic/generateSecret.js';
import { evaluateGuess } from '../logic/evaluateGuess.js';
import { isValidGuess } from '../logic/isValidGuess.js';
import { createDigitValidator } from '../logic/createDigitValidator.js';
import { countPossibleSecrets } from '../logic/countPossibleSecrets.js';
let state = null;
function renderSetup() {
    document.body.replaceChildren();
    const h1 = document.createElement('h1');
    h1.textContent = 'Bulls and Cows';
    document.body.appendChild(h1);
    //выбор длины
    const lenDiv = document.createElement('div');
    lenDiv.textContent = 'Длина: ';
    document.body.appendChild(lenDiv);
    for (let i = 2; i <= 6; i++) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'len';
        input.value = String(i);
        if (i === 4)
            input.checked = true;
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${i} `));
        lenDiv.appendChild(label);
    }
    //выбор системы
    const baseDiv = document.createElement('div');
    baseDiv.textContent = 'Система: ';
    document.body.appendChild(baseDiv);
    [2, 8, 10, 16].forEach((b) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'base';
        input.value = String(b);
        if (b === 10)
            input.checked = true;
        // Собирает кнопку и текст в метку, а метку кладет в блок baseDiv.
        label.appendChild(input);
        label.appendChild(document.createTextNode(`${b}`));
        baseDiv.appendChild(label);
    });
    // «Возможно вариантов: 5040».
    const info = document.createElement('p');
    document.body.appendChild(info);
    //кнопкa «Начать игру»
    const btn = document.createElement('button');
    btn.textContent = 'Начать игру';
    document.body.appendChild(btn);
    //функция апдейт обновляет интерфейс при смене настроек
    const update = () => {
        const b = Number(document.querySelector('input[name="base"]:checked').value);
        document.querySelectorAll('input[name="len"]').forEach((el) => {
            el.disabled = b === 2 && el.value !== '2';
        });
        const l = Number(document.querySelector('input[name="len"]:checked').value);
        info.textContent = `Возможно вариантов: ${countPossibleSecrets(l, b)}`;
    };
    document
        .querySelectorAll('input[type="radio"]')
        .forEach((r) => r.addEventListener('change', update));
    update();
    // Логика старта игры
    btn.onclick = () => {
        const l = Number(document.querySelector('input[name="len"]:checked').value);
        const b = Number(document.querySelector('input[name="base"]:checked').value);
        state = {
            settings: { length: l, base: b },
            secret: generateSecret(l, b),
            history: [],
            status: 'playing',
            startTime: Date.now(),
        };
        renderGame();
    };
}
const renderGame = () => {
    if (!state)
        return;
    document.body.replaceChildren();
    const h2 = document.createElement('h2');
    h2.textContent = `Игра (${state.settings.length} цифр)`;
    document.body.appendChild(h2);
    const historyDiv = document.createElement('div');
    document.body.appendChild(historyDiv);
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);
    const btn = document.createElement('button');
    btn.textContent = 'Проверить';
    document.body.appendChild(btn);
    const error = document.createElement('p');
    error.style.color = 'red';
    document.body.appendChild(error);
    const isValidDigit = createDigitValidator(state.settings.base);
    // Фильтрация ввода
    input.addEventListener('input', () => {
        input.value = input.value.split('').filter(isValidDigit).join('');
    });
    // Логика проверки
    btn.onclick = () => {
        if (!state)
            return;
        error.textContent = '';
        const guess = input.value.toLowerCase();
        if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
            error.textContent = 'Ошибка ввода';
            return;
        }
        if (state.history.some((h) => h.guess === guess)) {
            error.textContent = 'Уже было';
            return;
        }
        const { bulls, cows } = evaluateGuess(state.secret, guess);
        const newAttempt = { guess, bulls, cows };
        // Иммутабельное обновление
        state = {
            ...state,
            history: [...state.history, newAttempt],
        };
        const row = document.createElement('div');
        row.textContent = `${guess} — ${bulls} быков, ${cows} коров`;
        historyDiv.appendChild(row);
        input.value = '';
        if (bulls === state.settings.length) {
            state = { ...state, status: 'won' };
            const time = Math.floor((Date.now() - state.startTime) / 1000);
            const records = JSON.parse(localStorage.getItem('records') || '[]');
            localStorage.setItem('records', JSON.stringify([
                ...records,
                {
                    attempts: state.history.length,
                    time,
                    length: state.settings.length,
                    base: state.settings.base,
                },
            ]));
            document.body.replaceChildren();
            const win = document.createElement('h2');
            win.textContent = 'Победа!';
            document.body.appendChild(win);
            const stats = document.createElement('p');
            stats.textContent = `Попыток: ${state.history.length}, Время: ${time}с`;
            document.body.appendChild(stats);
            const restart = document.createElement('button');
            restart.textContent = 'Новая игра';
            restart.onclick = renderSetup;
            document.body.appendChild(restart);
        }
    };
};
renderSetup();
