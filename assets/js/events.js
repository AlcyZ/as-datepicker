import Builder from './layout-builder';
import formatter from './formater';

/**
 * Adds event listener to select a date on click.
 * @param date
 * @private
 */
const _selectDate = date => {
	const days = document.getElementsByClassName('day');
	let i = 0;
	
	for (; i < days.length; i++) {
		days[i].addEventListener('click', e => {
			const selected = new Date(date);
			selected.setMonth(selected.getMonth(), e.target.innerText);
			
			Builder.setSelection(selected);
			Builder.updateDisplay();
		})
	}
};

export default {
	/**
	 * Adds an event listener for the previous button.
	 * @param date
	 */
	previous: date => {
		document.querySelector('.previous').addEventListener('click', () => {
			date.setMonth(date.getMonth() - 1);
			Builder.renderDays(date);
			_selectDate(date);
		});
	},
	
	/**
	 * Adds an event listener for the next button.
	 * @param date
	 */
	next: date => {
		document.querySelector('.next').addEventListener('click', () => {
			date.setMonth(date.getMonth() + 1);
			Builder.renderDays(date);
			_selectDate(date);
		});
	},
	
	/**
	 * Adds an event listener to close the picker on click of the overlay or wrapper.
	 */
	close: () => {
		const overlay = Builder.getOverlay();
		const wrapper = Builder.getWrapper();
		
		overlay.addEventListener('click', e => {
			e.target === wrapper || e.target === overlay ? overlay.remove() : null;
		});
	},
	
	/**
	 * Adds an event listener to reset the current selection.
	 */
	reset: () => {
		document.querySelector('.reset button').addEventListener('click', Builder.reset);
	},
	
	/**
	 * Adds an event listener to select the today's date.
	 */
	today: () => {
		document.querySelector('.today button').addEventListener('click', Builder.today);
	},
	
	/**
	 * Adds event listener to select a date on click.
	 */
	selectDate: _selectDate,
	
	/**
	 * Adds event listener that validates the hours input on keyup.
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
	 * Adds event listener that validates the minutes input on keyup.
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
	},
	
	/**
	 * Adds event listener to submit the picker and add the selection to the input field.
	 * @param input
	 */
	submit: function(input) {
		document.querySelector('.submit button')
			.addEventListener('click', () => {
				const selection = Builder.getSelection();
				if (undefined === selection) {
					return;
				}
				const date = formatter('yyyy-mm-dd', selection);
				const hours = document.querySelector('input.hours').value;
				const minutes = document.querySelector('input.minutes').value;
				
				if (minutes !== '' && hours !== '') {
					input.value = date + ' ' + hours + ':' + minutes;
				} else {
					input.value = date;
				}
				
				document.getElementById('as-datepicker').remove();
			});
	}
}
