import LayoutFactory from './layout-factory';

export default {
	/**
	 * Shows the previous month on the calendar.
	 * @param {Event} e Click event.
	 * @param {Date} date Current date of calendar.js, the instance them self gets modified.
	 */
	previous: (e, date) => {
		date.setMonth(date.getMonth() - 1);
		
		LayoutFactory.rebuildCalendar(date);
	},
	
	/**
	 * Shows the next month on the calendar.
	 * @param {Event} e Click event.
	 * @param {Date} date Current date of calendar.js, the instance them self gets modified.
	 */
	next: (e, date) => {
		date.setMonth(date.getMonth() + 1);
		
		LayoutFactory.rebuildCalendar(date);
	},
	
	/**
	 * Sets the event handler to close the calendar widget.
	 * @param overlay
	 * @param wrapper
	 */
	close: (overlay, wrapper) => {
		overlay.addEventListener('click', e => {
			e.target === wrapper || e.target === overlay ? overlay.remove() : null;
		});
	},
	
	selectDate: date => {
		const days = document.getElementsByClassName('day');
		let i = 0;
		
		for (; i < days.length; i++) {
			days[i].addEventListener('click', e => {
				LayoutFactory.selectDate(e.target.innerText, date);
			})
		}
	}
}
