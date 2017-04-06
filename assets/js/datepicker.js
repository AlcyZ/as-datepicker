// Example usage of es6 picker module.

import Calendar from './calendar.js';

const dateTimeInputs = document.getElementsByClassName('date-time');
let i = 0;

for (; i < dateTimeInputs.length; i++) {
	dateTimeInputs[i].addEventListener('focus', e => Calendar.bootstrap(e));
}
