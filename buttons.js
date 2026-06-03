// Calculator
let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    let output = document.querySelector('output');
    let firstNum = document.querySelector('#first-num').value;
    let secondNum = document.querySelector('#second-num').value;
    let operator = document.querySelector('#operator').value;
    try {
    output.innerHTML = eval(`${firstNum} ${operator} ${secondNum}`);
    } catch (err) {
    output.innerHTML = `Error: ${err.message}`;
    }
});

// Console method buttons
let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

const sampleStudents = [
    { name: 'Nicole', score: 95, grade: 'A' },
    { name: 'Stephanie', score: 94, grade: 'A' },
    { name: 'Dishita', score: 96, grade: 'A' },
];

// Console Log
errorBtns[0].addEventListener('click', () => {
    console.log('Console Log Demo');
});

// Console Error
errorBtns[1].addEventListener('click', () => {
    console.error('Console Error Demo');
});

// Console Count
errorBtns[2].addEventListener('click', () => {
    console.count('Button click count:');
});

// Console Warn
errorBtns[3].addEventListener('click', () => {
    console.warn('Console Warn Demo');
});

// Console Assert
errorBtns[4].addEventListener('click', () => {
    const score = -1;
    console.assert(score >= 0, 'Assertion failed. Score must be non-negative.', score);
});

// Console Clear
errorBtns[5].addEventListener('click', () => {
    console.clear();
});

// Console Dir
errorBtns[6].addEventListener('click', () => {
    console.dir(document.querySelector('form'));
});

// Console Dirxml
errorBtns[7].addEventListener('click', () => {
    console.dirxml(document.querySelector('form'));
});

// Console Group Start
errorBtns[8].addEventListener('click', () => {
    console.group('Student Report');
    console.groupCollapsed('Nicole');
    console.log('Score:', 95);
    console.log('Grade:', 'A');
    console.groupEnd();
});

// Console Group End
errorBtns[9].addEventListener('click', () => {
    console.groupEnd();
});

// Console Table
errorBtns[10].addEventListener('click', () => {
    console.table(sampleStudents);
});

// Start Timer
errorBtns[11].addEventListener('click', () => {
    console.time('lab9-timer');
});

// End Timer
errorBtns[12].addEventListener('click', () => {
    console.timeEnd('lab9-timer');
});

// Console Trace
errorBtns[13].addEventListener('click', () => {
    function innerFn()  { console.trace('console.trace — call stack:'); }
    function middleFn() { innerFn(); }
    function outerFn()  { middleFn(); }
    outerFn();
});

// Trigger a Global Error
errorBtns[14].addEventListener('click', () => {
    undefinedFunction();
});


// Try / Catch / Finally
function parseStudentJSON(raw) {
    try {
    const obj = JSON.parse(raw);
    if (!obj.name) throw new ValidationError('Missing required field: name', 'name');
    console.log('JSON parsed OK:', obj);
    } catch (err) {
    console.error('catch:', err.name, err.message);
    } finally {
    console.log('finally: parse attempt complete');
    }
}

// Custom Error Classes
class AppError extends Error {
    constructor(message) {
    super(message);
    this.name = this.constructor.name;
    }
}

class ValidationError extends AppError {
    constructor(message, field) {
    super(message);
    this.field = field;
    }
}

class RangeValidationError extends AppError {
    constructor(message, min, max, actual) {
    super(message);
    this.min    = min;
    this.max    = max;
    this.actual = actual;
    }
}

class NetworkError extends AppError {
    constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    }
}

// Demonstrate custom errors in console on load
try {
    parseStudentJSON('{"score":95}'); // missing name — throws ValidationError
} catch (err) {
    console.error('Unhandled:', err);
}

try {
    const pct = 105;
    if (pct < 0 || pct > 100)
    throw new RangeValidationError(`Percentage must be 0-100, got ${pct}`, 0, 100, pct);
} catch (err) {
    if (err instanceof RangeValidationError)
    console.error(`RangeValidationError on [${err.min}-${err.max}], got ${err.actual}:`, err.message);
    else throw err;
}


// Global Error Handler (window.onerror)
window.onerror = function(message, source, lineno, colno, error) {
    console.error(`[Global Error] ${message} — ${source}:${lineno}:${colno}`);

    return false;
};