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
	
	/**
	 * Resets the current date of the picker
	 */
	reset: () => {
		document.querySelector('.reset button').addEventListener('click', LayoutFactory.reset);
	},
	
	/**
	 * Sets the event listener for picking a date.
	 * @param date
	 */
	selectDate: date => {
		const days = document.getElementsByClassName('day');
		let i = 0;
		
		for (; i < days.length; i++) {
			days[i].addEventListener('click', e => {
				LayoutFactory.selectDate(e.target.innerText, date);
			})
		}
	},
	
	/**
	 * Set event listener to validate the hours input field.
	 * Only integers between 0 and 23 are allowed.
	 */
	hoursValidator: () => {
		document.querySelector('input.hours').addEventListener('keyup', e => {
			if (!Number.isInteger(Number(e.target.value))) {
				e.target.value = '';
			}
			
			if (Number(e.target.value) > 23) {
				e.target.value = '23';
			}
			
			if (Number(e.target.value) < 0) {
				e.target.value = '0';
			}
		})
	},
	
	/**
	 * Set event listener to validate the hours input field.
	 * Only integers between 0 and 59 are allowed.
	 */
	minutesValidator: () => {
		document.querySelector('input.minutes').addEventListener('keyup', e => {
			if (!Number.isInteger(Number(e.target.value))) {
				e.target.value = '';
			}
			
			if (Number(e.target.value) > 59) {
				e.target.value = '59';
			}
			
			if (Number(e.target.value) < 0) {
				e.target.value = '0';
			}
		})
	}
}
