// Example usage of es6 picker module.

import Calendar from './calendar.js';

document.querySelector('.as-datepicker').addEventListener('click', () => {
	// should create layout and set events
	Calendar.bootstrap();
});