import LayoutFactory from './layout-factory';
import Lang from './lang';

// declaration of dynamic elements
let overlay;
let wrapper;
let calendar;
let dayNameWrapper;
let month;
let day;
let year;
let days;
let navMonth;

// Todo: try to move the following values.
let selection;

/**
 * Creates and connect the elements for the date pickers display.
 *
 * @param date
 * @returns {Element}
 * @private
 */
const _createDisplay = date => {
	const display = LayoutFactory.display();
	month = LayoutFactory.month(date);
	day = LayoutFactory.day(date);
	year = LayoutFactory.year(date);
	
	display.appendChild(month);
	display.appendChild(day);
	display.appendChild(year);
	
	return display;
};

/**
 * Creates and connect the elements for the date pickers calendar.
 *
 * @param date
 * @returns {Element}
 * @private
 */
const _createCalendar = date => {
	calendar = LayoutFactory.calendar();
	const navigation = LayoutFactory.navigation();
	navMonth = LayoutFactory.navMonth(date);
	const previous = LayoutFactory.previous();
	const next = LayoutFactory.next();
	const weekdayNames = LayoutFactory.weekdayNames();
	days = LayoutFactory.days(date);
	
	navigation.appendChild(previous);
	navigation.appendChild(navMonth);
	navigation.appendChild(next);
	
	calendar.appendChild(navigation);
	calendar.appendChild(weekdayNames);
	calendar.appendChild(days);
	
	return calendar;
};

/**
 * Creates and connect the elements for the date pickers actions.
 *
 * @returns {Element}
 * @private
 */
const _createActions = () => {
	const actions = LayoutFactory.actions();
	const today = LayoutFactory.today();
	const reset = LayoutFactory.reset();
	const submit = LayoutFactory.submit();
	
	actions.appendChild(today);
	actions.appendChild(reset);
	actions.appendChild(submit);
	
	return actions;
};

/**
 * Creates the layout for the date picker and insert is as first element of the body tag.
 *
 * @param date
 * @private
 */
const _createPicker = date => {
	const body = document.getElementsByTagName('body')[0];
	overlay = LayoutFactory.overlay();
	wrapper = LayoutFactory.wrapper();
	const calendarWrapper = LayoutFactory.calendarWrapper();
	
	dayNameWrapper = LayoutFactory.dayNameWrapper();
	const display = _createDisplay(date);
	const calendar = _createCalendar(date);
	const timePicker = LayoutFactory.timePicker();
	const actions = _createActions();
	
	calendarWrapper.appendChild(dayNameWrapper);
	calendarWrapper.appendChild(display);
	calendarWrapper.appendChild(calendar);
	calendarWrapper.appendChild(timePicker);
	calendarWrapper.appendChild(actions);
	wrapper.appendChild(calendarWrapper);
	overlay.appendChild(wrapper);
	
	body.insertBefore(overlay, body.firstChild);
};

const _getSelection = () => selection;

export default {
	createPicker: _createPicker,
	
	setSelection: date => {
		selection = date;
	},
	
	getSelection: _getSelection,
	
	/**
	 * Render the days.
	 * @param date
	 */
	renderDays: date => {
		days.remove();
		days = LayoutFactory.days(date);
		calendar.appendChild(days);
		navMonth.innerText = Lang.months[date.getMonth()];
	},
	
	/**
	 * Updates the display.
	 */
	updateDisplay: () => {
		dayNameWrapper.innerText = Lang.weekdays[_getSelection().getDay()];
		month.innerText = Lang.months[_getSelection().getMonth()];
		day.innerText = _getSelection().getDate();
		year.innerText = _getSelection().getFullYear();
	},
	
	/**
	 * Resets the current selection.
	 */
	reset: () => {
		dayNameWrapper.innerText = '';
		month.innerText = '';
		day.innerText = '';
		year.innerText = '';
	},
	
	/**
	 * Select the date of today.
	 */
	today: () => {
		const date = new Date();
		dayNameWrapper.innerText = Lang.weekdays[date.getDay()];
		month.innerText = Lang.months[date.getMonth()];
		day.innerText = date.getDate();
		year.innerText = date.getFullYear();
	},
	
	/**
	 * Returns the overlay
	 * @returns {Element}
	 */
	getOverlay: () => {
		return overlay;
	},
	
	/**
	 * Returns the wrapper.
	 * @returns {Element}
	 */
	getWrapper: () => {
		return wrapper;
	}
}
