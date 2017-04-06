import calendarData from './calendar-data';
import Events from './events';
import formatter from './formater';

// prototype helper for date object
(function() {
	Date.prototype.getMonthName = function() {
		const months = [
			'Januar',
			'Februar',
			'März',
			'April',
			'Mai',
			'Juni',
			'Juli',
			'August',
			'September',
			'Oktober',
			'November',
			'Dezember'
		];
		
		return months[this.getMonth()];
	}
})();

const _rndId = () => {
	return 'as-datepicker-' + ((1 + Math.random()) * 0x10000 | 0).toString();
};

const calendarId = _rndId();
let calendar;
let month;
let daysWrapper;
let actions;
let preview;

let selected;

/**
 * Creates the dom of the calendar's month navigation.
 *
 * @param date
 * @returns {Element}
 * @private
 */
const _createCalendarNav = date => {
	const nav = document.createElement('div');
	const previous = document.createElement('div');
	const next = document.createElement('div');
	
	const previousIcon = document.createElement('i');
	const nextIcon = document.createElement('i');
	
	previousIcon.classList.add('material-icons');
	previousIcon.innerText = 'arrow_back';
	nextIcon.classList.add('material-icons');
	nextIcon.innerText = 'arrow_forward';
	
	month = document.createElement('div');
	
	nav.classList.add('nav');
	previous.classList.add('previous');
	month.classList.add('month');
	next.classList.add('next');
	
	previous.appendChild(previousIcon);
	next.appendChild(nextIcon);
	month.innerText = date.getMonthName() + ' (' + date.getFullYear() + ')';
	
	nav.appendChild(previous);
	nav.appendChild(month);
	nav.appendChild(next);
	
	return nav;
};

/**
 * Creates the dom of the calendar's weekdays.
 *
 * @returns {Element}
 * @private
 */
const _createCalendarWeekdays = () => {
	const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
	const wrapper = document.createElement('div');
	let i = 0;
	let day;
	
	wrapper.classList.add('week-days');
	
	for (; i < days.length; i++) {
		day = document.createElement('div');
		day.innerText = days[i];
		wrapper.appendChild(day);
	}
	
	return wrapper;
};

/**
 * Creates the dom of the calendar's dates.
 * @param date
 * @returns {Element}
 * @private
 */
const _createDays = date => {
	const data = calendarData(date);
	let i = 0;
	let day;
	let row;
	
	daysWrapper = document.createElement('div');
	daysWrapper.classList.add('days-wrapper');
	data.length / 7 === 4 ? daysWrapper.classList.add('four') : null;
	data.length / 7 === 5 ? daysWrapper.classList.add('five') : null;
	data.length / 7 === 6 ? daysWrapper.classList.add('six') : null;
	
	for (; i < data.length; i++) {
		if (i % 7 === 0) {
			row = document.createElement('div');
			row.classList.add('week');
		}
		
		day = document.createElement('div');
		day.classList.add('day');
		date.getMonth() !== data[i].getMonth() ? day.classList.add('other-month') : null;
		day.innerText = data[i].getDate();
		
		row.appendChild(day);
		if (i % 7 === 6) {
			daysWrapper.appendChild(row);
		}
	}
	
	return daysWrapper;
};

/**
 * Creates the actions.
 * There is a preview of the selected date and buttons to reset and submit the selected date.
 * @private
 */
const _createActions = () => {
	const wrapper = document.createElement('div');
	const previewWrapper = document.createElement('div');
	const actionsWrapper = document.createElement('div');
	const reset = document.createElement('div');
	const submit = document.createElement('div');
	const resetBtn = document.createElement('button');
	const submitBtn = document.createElement('button');
	preview = document.createElement('div');
	
	const timeWrapper = document.createElement('div');
	const timeInputs = document.createElement('div');
	const timeTitle = document.createElement('div');
	const hours = document.createElement('input');
	const minutes = document.createElement('input');
	
	// set element classes and inner text
	wrapper.classList.add('actions-wrapper');
	previewWrapper.classList.add('preview-wrapper');
	preview.classList.add('preview');
	actionsWrapper.classList.add('btn-wrapper');
	reset.classList.add('reset');
	submit.classList.add('submit');
	resetBtn.innerText = 'Reset';
	submitBtn.innerText = 'Submit';
	
	timeWrapper.classList.add('time-wrapper');
	timeInputs.classList.add('time-input');
	timeTitle.classList.add('time-title');
	timeTitle.innerText = 'Time:';
	hours.classList.add('hours');
	hours.setAttribute('placeholder', 'hours');
	minutes.classList.add('minutes');
	minutes.setAttribute('placeholder', 'minutes');
	
	// connect dom elements
	reset.appendChild(resetBtn);
	submit.appendChild(submitBtn);
	timeInputs.appendChild(hours);
	timeInputs.appendChild(minutes);
	timeWrapper.appendChild(timeTitle);
	timeWrapper.appendChild(timeInputs);
	actionsWrapper.appendChild(reset);
	actionsWrapper.appendChild(submit);
	previewWrapper.appendChild(preview);
	previewWrapper.appendChild(timeWrapper);
	wrapper.appendChild(previewWrapper);
	wrapper.appendChild(actionsWrapper);
	
	return wrapper;
};

/**
 * Public methods to create the date-picker layout
 */
export default {
	/**
	 * Creates the black, fixed overlay.
	 * @returns {Element}
	 */
	createOverlay: () => {
		const overlay = document.createElement('div');
		overlay.classList.add('overlay');
		overlay.setAttribute('id', 'as-datetime-picker');
		
		return overlay;
	},
	
	/**
	 * Creates the flexbox wrapper.
	 * @returns {Element}
	 */
	createWrapper: () => {
		const wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		
		return wrapper;
	},
	/**
	 * Creates the calendar.
	 * @returns {Element}
	 */
	createCalendar: date => {
		calendar = document.createElement('div');
		calendar.setAttribute('id', calendarId);
		calendar.classList.add('calendar');
		actions = _createActions();
		
		calendar.appendChild(_createCalendarNav(date));
		calendar.appendChild(_createCalendarWeekdays());
		calendar.appendChild(actions);
		calendar.insertBefore(_createDays(date), actions);
		
		return calendar;
	},
	/**
	 * Rebuilds the dates and month name of the calendar.
	 * @param {Date} date Current date of calendar.js.
	 */
	rebuildCalendar: date => {
		daysWrapper.remove();
		calendar.insertBefore(_createDays(date), actions);
		month.innerText = date.getMonthName() + ' (' + date.getFullYear() + ')';
		Events.selectDate(date);
	},
	/**
	 * Returns the id of the calendar.
	 */
	getCalendarId: () => {
		return calendarId;
	},
	/**
	 * Selects a date.
	 * @param {string} day
	 * @param {Date} date
	 */
	selectDate: (day, date) => {
		selected = new Date(date);
		selected.setMonth(selected.getMonth(), day);
		
		preview.innerText = formatter('dd.mm.yyyy', selected);
	},
	/**
	 * Resets the current selected date.
	 */
	reset: () => {
		selected = null;
		preview.innerText = '';
	},
	/**
	 * Returns the selected date.
	 * @returns {*}
	 */
	getSelected: () => {
		return selected;
	}
}