import calendarData from './calendar-data';

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
	const month = document.createElement('div');
	const next = document.createElement('div');
	
	const previousIcon = document.createElement('img');
	const nextIcon = document.createElement('img');
	
	// Todo: Icon path configurable
	previousIcon.setAttribute('src', '../assets/icons/ic_arrow_back_black_24px.svg');
	nextIcon.setAttribute('src', '../assets/icons/ic_arrow_forward_black_24px.svg');
	
	nav.classList.add('nav');
	previous.classList.add('previous');
	month.classList.add('month');
	next.classList.add('next');
	
	previous.appendChild(previousIcon);
	next.appendChild(nextIcon);
	month.innerText = date.getMonthName();
	
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
	// Todo Remove "new Date" and inject as argument later
	const data = calendarData(date);
	const daysWrapper = document.createElement('div');
	let i = 0;
	let day;
	let row;
	
	daysWrapper.classList.add('days-wrapper');
	
	for (; i < data.length; i++) {
		if (i % 7 === 0) {
			row = document.createElement('div');
			row.classList.add('days-row');
		}
		day = document.createElement('div');
		day.classList.add('day');
		day.innerText = data[i].getDate();
		row.appendChild(day);
		if (i % 7 === 6) {
			daysWrapper.appendChild(row);
		}
	}
	
	return daysWrapper;
};

/**
 * Public methods to create the date-picker layout
 */
export default {
	/**
	 * Creates the black, fixed overlay.
	 * @returns {Element}
	 */
	createOverlay: function() {
		const overlay = document.createElement('div');
		overlay.classList.add('overlay');
		overlay.setAttribute('id', 'as-datetime-picker');
		
		return overlay;
	},
	
	/**
	 * Creates the flexbox wrapper.
	 * @returns {Element}
	 */
	createWrapper: function() {
		const wrapper = document.createElement('div');
		wrapper.classList.add('wrapper');
		
		return wrapper;
	},
	/**
	 * Creates the calendar.
	 * @returns {Element}
	 */
	createCalendar: function() {
		const today = new Date();
		today.setMonth(today.getMonth() + 1);
		
		const calendar = document.createElement('div');
		calendar.classList.add('calendar');
		
		calendar.appendChild(_createCalendarNav(today));
		calendar.appendChild(_createCalendarWeekdays());
		calendar.appendChild(_createDays(today));
		
		return calendar;
	}
}