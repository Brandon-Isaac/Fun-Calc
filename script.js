const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        let displayedNum = display.textContent.replace(/\s/g, ''); // Remove spaces for calculation
        const previousKeyType = calculator.dataset.previousKeyType;

        // Remove 'is-depressed' class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'));

        if (!action) {
            if (displayedNum === "0" || previousKeyType === "operator") {
                displayedNum = keyContent;
            } else if (previousKeyType === "calculate") {
                displayedNum = keyContent;
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
            } else {
                displayedNum = displayedNum + keyContent;
            }
            display.textContent = formatNumber(displayedNum);
            calculator.dataset.previousKeyType = 'number';
        } else if (action === "add" || action === "subtract" || action === "multiply" || action == "divide") {
           

            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
            calculator.dataset.previousKeyType = 'operator';
            key.classList.add('is-depressed');
        } else if (action === "decimal") {
            console.log("decimal");
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                displayedNum = '0.';
            } else if (!displayedNum.includes('.')) {
                displayedNum = displayedNum + '.';
            }
            display.textContent = formatNumber(displayedNum);
            calculator.dataset.previousKeyType = 'decimal';
        } else if (action === "calculate") {
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = calculator.dataset.operator;

            if (firstValue && operator && previousKeyType !== 'calculate' && previousKeyType !== 'operator') {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = formatNumber(calcValue);
                calculator.dataset.firstValue = calcValue;
            } else {
                display.textContent = formatNumber(displayedNum);
            }

            calculator.dataset.previousKeyType = 'calculate';
        } else if (action === "clear") {
            key.textContent = 'AC'
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.secondValue = '';
            display.textContent = formatNumber(0);
            calculator.dataset.previousKeyType = 'clear';
        }
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
    }
});

const calculate = (n1, operator, n2) => {
    let result;
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (operator === 'add') {
        result = num1 + num2;
    } else if (operator === 'subtract') {
        result = num1 - num2;
    } else if (operator === 'multiply') {
        result = num1 * num2;
    } else if (operator === 'divide') {
        result = num1 / num2;
    }

    // Limit to 12 sf
    result = parseFloat(result.toPrecision(12));


    return result;
};

const formatNumber = (num) => {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
};