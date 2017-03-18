// prototype additional date helper methods
// (function() {
// 	const days = [
// 		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
// 	];
// 	const months = [
// 		'January',
// 		'February',
// 		'March',
// 		'April',
// 		'May',
// 		'June',
// 		'July',
// 		'August',
// 		'September',
// 		'October',
// 		'November',
// 		'December'
// 	];
//
// 	Date.prototype.getMonthName = function() {
// 		return months[this.getMonth()];
// 	};
//
// 	Date.prototype.getDayName = function() {
// 		return days[this.getDay()];
// 	}
// })();


// private class "methods"
const _firstCalendarMonday = date => {
	const first = new Date(date);
	first.setMonth(first.getMonth(), 1);
	first.setDate(first.getDate() - (first.getDay() - 1));
	
	return first;
};

const _lastCalendarSunday = date => {
	const last = new Date(date);
	last.setMonth(last.getMonth() + 1, 0);
	if (last.getDay() !== 0) {
		last.setDate(last.getDate() + (7 - last.getDay()));
	}
	
	return last;
};

export default class Calendar {
	constructor() {
		this.data = [];
		this.init();
	}
	
	init() {
		const current = new Date();
		let first = _firstCalendarMonday(current);
		const last = _lastCalendarSunday(current);
		
		while(first.toString() !== last.toString()) {
			this.data.push(new Date(first));
			first.setDate(first.getDate() + 1);
		}
	}
	
	getData() {
		return this.data;
	}
}