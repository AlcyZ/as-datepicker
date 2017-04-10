import Picker from './picker.js';

const dateTimeInputs = document.getElementsByClassName('date-time');
let i = 0;

for (; i < dateTimeInputs.length; i++) {
	dateTimeInputs[i].addEventListener('focus', e => Picker.bootstrap(e));
}
