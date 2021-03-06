/**
 * Determine the first monday for a calendar by the given date.
 *
 * @param date
 * @returns {Date}
 * @private
 */
const _firstCalendarMonday = date => {
	const first = new Date(date);
	first.setMonth(first.getMonth(), 1);
	first.setDate(first.getDate() - (first.getDay() - 1));
	
	return first;
};

/**
 * Determines the last sunday for a calendar by the given date.
 *
 * @param date
 * @returns {Date}
 * @private
 */
const _lastCalendarSunday = date => {
	const last = new Date(date);
	last.setMonth(last.getMonth() + 1, 0);
	if (last.getDay() !== 0) {
		last.setDate(last.getDate() + (7 - last.getDay()));
	}
	
	return last;
};

/**
 * Creates and returns calendar data for the given data.
 * The first monday is whether the first date of the month or the last monday of the previous month.
 * The last sunday is whether the last date of the month or the first sunday of the next month.
 *
 * @param date
 * @returns {Array}
 */
const getCalendarData = date => {
	const data = [];
	const last = _lastCalendarSunday(date);
	let first = _firstCalendarMonday(date);
	let process = true;
	
	first.setHours(0, 0, 0, 0);
	last.setHours(0, 0, 0, 0);
	
	while(process) {
		data.push(new Date(first));
		process = first.toString() !== last.toString();
		first.setDate(first.getDate() + 1);
	}
	
	return data;
};

export default getCalendarData;
