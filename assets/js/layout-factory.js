import calendarData from './calendar-data';
import Lang from './lang';

/**
 * Creates a new div dom node with the given class attribute. Optionally, an inner text will be added.
 * This helper method is used most of the time to factory the dom nodes of the date-picker.
 *
 * @param {string} className Name of class to be added,
 * @param {string} innerText Value of inner text to be added.
 * @returns {Element}
 * @private
 */
const _factor = (className, innerText) => {
	const element = document.createElement('div');
	element.classList.add(className);
	
	if (undefined !== innerText) {
		element.innerText = innerText;
	}
	
	return element;
};

/**
 * Creates the date pickers overlay.
 *
 * @returns {Element}
 * @private
 */
const _createOverlay = () => {
	const overlay = _factor('overlay');
	overlay.setAttribute('id', 'as-datepicker');
	
	return overlay;
};

/**
 * Creates the date pickers wrapper.
 *
 * @returns {Element}
 * @private
 */
const _createWrapper = () => {
	return _factor('wrapper');
};

/**
 * Creates the date pickers calendar wrapper.
 *
 * @returns {Element}
 * @private
 */
const _createCalendarWrapper = () => {
	return _factor('calendar-wrapper')
};

/**
 * Creates the date pickers day name wrapper.
 *
 * @returns {Element}
 * @private
 */
const _createDayNameWrapper = () => {
	return _factor('day-name-wrapper', /* Lang.weekdays[date.getDay()] */);
};

/**
 * Creates the date pickers display.
 *
 * @returns {Element}
 * @private
 */
const _createDisplay = () => {
	return _factor('display');
};

/**
 * Creates the date pickers display month.
 *
 * @returns {Element}
 * @private
 */
const _createMonth = () => {
	return _factor('month', /* Lang.months[date.getMonth()] */);
};

/**
 * Creates the date pickers display date.
 *
 * @returns {Element}
 * @private
 */
const _createDay = () => {
	return _factor('day', /* date.getDate() */);
};

/**
 * Creates the date pickers display year.
 *
 * @returns {Element}
 * @private
 */
const _createYear = () => {
	return _factor('year', /* date.getFullYear() */);
};

/**
 * Creates the date pickers calendar.
 *
 * @returns {Element}
 * @private
 */
const _createCalendar = () => {
	return _factor('calendar');
};

/**
 * Creates the date pickers calendar navigation.
 *
 * @returns {Element}
 * @private
 */
const _createNavigation = () => {
	return _factor('navigation');
};

/**
 * Creates the date pickers previous button.
 *
 * @returns {Element}
 * @private
 */
const _createPrevious = () => {
	const wrapper = _factor('previous');
	const btn = document.createElement('button');
	btn.innerText = '-';
	wrapper.appendChild(btn);
	
	return wrapper;
};

/**
 * Creates the date pickers navigation month.
 *
 * @param date
 * @returns {Element}
 * @private
 */
const _createNavMonth = date => {
	return _factor('nav-month', Lang.months[date.getMonth()]);
};

/**
 * Creates the date pickers next button.
 *
 * @returns {Element}
 * @private
 */
const _createNext = () => {
	const wrapper = _factor('next');
	const btn = document.createElement('button');
	btn.innerText = '+';
	wrapper.appendChild(btn);
	
	return wrapper;
};

/**
 * Creates the date pickers weekdays.
 *
 * @returns {Element}
 * @private
 */
const _createWeekdayNames = () => {
	const wrapper = _factor('weekday-names');
	let day;
	let i = 0;
	
	for (; i < Lang.weekdaysShort.length; i++) {
		day = document.createElement('div');
		day.innerText = Lang.weekdaysShort[i];
		wrapper.appendChild(day);
	}
	
	return wrapper;
};

/**
 * Create the date pickers days.
 *
 * @param date
 * @returns {Element}
 * @private
 */
const _createDays = date => {
	const data = calendarData(date);
	const daysWrapper = _factor('days');
	let i = 0;
	let day;
	let row;
	
	for (; i < data.length; i++) {
		if (i % 7 === 0) {
			row = _factor('row');
		}
		
		day = _factor('day', data[i].getDate());
		date.getMonth() !== data[i].getMonth() ? day.classList.add('other-month') : null;
		
		row.appendChild(day);
		if (i % 7 === 6) {
			daysWrapper.appendChild(row);
		}
	}
	
	return daysWrapper;
};

/**
 * Creates the date pickers time inputs.
 *
 * @returns {Element}
 * @private
 */
const _createTimePicker = () => {
	// Todo: Add translations for placeholder
	const timePicker = _factor('time-picker');
	const hours = document.createElement('input');
	hours.classList.add('hours');
	hours.setAttribute('type', 'text');
	hours.setAttribute('placeholder', 'hours');
	const minutes = document.createElement('input');
	minutes.classList.add('minutes');
	minutes.setAttribute('type', 'text');
	minutes.setAttribute('placeholder', 'minutes');
	
	timePicker.appendChild(hours);
	timePicker.appendChild(minutes);
	
	return timePicker;
};

/**
 * Creates the date pickers actions.
 *
 * @returns {Element}
 * @private
 */
const _createActions = () => {
	return _factor('actions');
};

/**
 * Creates the date pickers today button.
 *
 * @returns {Element}
 * @private
 */
const _createToday = () => {
	// Todo: Add translations
	const today = _factor('today');
	const btn = document.createElement('button');
	btn.setAttribute('type', 'button');
	btn.innerText = 'Today';
	today.appendChild(btn);
	
	return today;
};

/**
 * Creates the date pickers reset button.
 *
 * @returns {Element}
 * @private
 */
const _createReset = () => {
	// Todo: Add translations
	const reset = _factor('reset');
	const btn = document.createElement('button');
	btn.setAttribute('type', 'button');
	btn.innerText = 'Reset';
	reset.appendChild(btn);
	
	return reset;
};

/**
 * Creates the date pickers submit button.
 *
 * @returns {Element}
 * @private
 */
const _createSubmit = () => {
	// Todo: Add translations
	const submit = _factor('submit');
	const btn = document.createElement('button');
	btn.setAttribute('type', 'button');
	btn.innerText = 'Submit';
	submit.appendChild(btn);
	
	return submit;
};

export default {
	overlay: _createOverlay,
	wrapper: _createWrapper,
	calendarWrapper: _createCalendarWrapper,
	dayNameWrapper: _createDayNameWrapper,
	display: _createDisplay,
	month: _createMonth,
	day: _createDay,
	year: _createYear,
	calendar: _createCalendar,
	navigation: _createNavigation,
	previous: _createPrevious,
	navMonth: _createNavMonth,
	next: _createNext,
	weekdayNames: _createWeekdayNames,
	days: _createDays,
	timePicker: _createTimePicker,
	actions: _createActions,
	today: _createToday,
	reset: _createReset,
	submit: _createSubmit
};
