const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            currentInput += value;
            updateDisplay();
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                    currentInput = '';
                    operator = value;
                } else {
                    calculate();
                    operator = value;
                }
            }
        } else if (button.id === 'equals') {
            calculate();
        } else if (button.id === 'clear') {
            clear();
        }
    });
});

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function calculate() {
    if (firstOperand !== null && currentInput !== '' && operator !== '') {
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    display.textContent = 'Fehler: Division durch Null';
                    return;
                }
                result = firstOperand / secondOperand;
                break;
        }

        currentInput = result.toString();
        firstOperand = result;
        operator = '';
        updateDisplay();
    }
}

function clear() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay();
}

updateDisplay();