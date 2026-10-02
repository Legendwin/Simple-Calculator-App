const previousOp = document.getElementById('previous-operand');
const currentOp = document.getElementById('current-operand');

let current = '0';
let previous = '';
let operation = null;

function compute() {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    if (isNaN(prev) || isNaN(curr)) {
        return;
    };
    let result;
    switch (operation) {
        case '+': 
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '÷':
            if (curr === 0) {
                result = 'Error';
                break;
            } else {
                result = prev / curr;
                break;
            };
        default:
            return;
    };
    if (result === 'Error') {
        current = 'Error';
        previous = '';
        operation = null;
        updateDisplay();
        return;
    } else {
        current = parseFloat(result.toFixed(10)).toString();
        previous = '';
        operation = null;
        updateDisplay();
    };
};

function opSymbol(op) {
    switch (op) {
        case '+':
            return '+'
        case '-':
            return '-';
        case '×':
            return '×';
        case '÷':
            return '÷';
        default:
            return '';
    };
};

function chooseOperation(op) {
    if (current === '') {
        return;
    };
    if (previous !== '') {
        compute();
    };
    operation = op;
    previous = current;
    current = '0';
    updateDisplay();
}

function appendNumber(num) {
    if (current === 'Error') {
        current = '0';
    };
    if (num === '.' && current.includes('.')) {
        return;
    };
    if (current === '0' && num !== '.') {
        current = num;
    } else {
        current = current + num;
    };
    updateDisplay();
};

function clearAll() {
    current = '0';
    previous = '';
    operation = null;
    updateDisplay();
};

function clearEntry() {
    current = '0';
    updateDisplay();
};

function deleteDigit() {
    if (current === 'Error') {
        clearAll();
        return;
    };
    if (current.length <= 1) {
        current = '0';
    } else {
        current = current.slice(0, -1);
    };
    updateDisplay();
};

document.querySelectorAll('.calc-button.number').forEach(btn => {
    btn.addEventListener('click', (e) => appendNumber(e.target.textContent));
});

document.querySelectorAll('.calc-button.operator').forEach(btn => {
    const action = btn.textContent;
    if (action === 'C') {
        btn.addEventListener('click', clearAll);
    } else if (action === 'CE') {
        btn.addEventListener('click', clearEntry);
    } else if (action === '⌫') {
        btn.addEventListener('click', deleteDigit);
    } else if (action === '=') {
        btn.addEventListener('click', compute);
    } else {
        btn.addEventListener('click', () => chooseOperation(action));
    };
});

function updateDisplay() {
    currentOp.textContent = current;
    previousOp.textContent = operation && previous ? `${previous} ${opSymbol(operation)}` : '';
};

updateDisplay();