import Builder from './layout-builder';

const _selectDate = date => {
    const days = document.getElementsByClassName('day');
    let i = 0;

    for (; i < days.length; i++) {
        days[i].addEventListener('click', e => {
            const selected = new Date(date);
            selected.setMonth(selected.getMonth(), e.target.innerText);

            Builder.updateDisplay(selected);
        })
    }
};

export default {
    previous: date => {
        document.querySelector('.previous').addEventListener('click', e => {
            date.setMonth(date.getMonth() - 1);
            Builder.renderDays(date);
            _selectDate(date);
        });
    },

    next: date => {
        document.querySelector('.next').addEventListener('click', e => {
            date.setMonth(date.getMonth() + 1);
            Builder.renderDays(date);
            _selectDate(date);
        });
    },

    close: () => {
        const overlay = Builder.getOverlay();
        const wrapper = Builder.getWrapper();

        overlay.addEventListener('click', e => {
            e.target === wrapper || e.target === overlay ? overlay.remove() : null;
        });
    },

    reset: () => {
        document.querySelector('.reset button').addEventListener('click', Builder.reset);
    },

    selectDate: _selectDate,

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

    submit: function (input) {
        // 	document.querySelector('#' + LayoutFactory.getCalendarId() + ' .submit button')
        // 		.addEventListener('click', () => {
        // 			const selected = LayoutFactory.getSelected();
        // 			if (undefined === selected) {
        // 				return;
        // 			}
        // 			const date = formatter('yyyy-mm-dd', LayoutFactory.getSelected());
        // 			const hours = document.querySelector('#' + LayoutFactory.getCalendarId() + ' input.hours').value;
        // 			const minutes = document.querySelector('#' + LayoutFactory.getCalendarId() + ' input.minutes').value;
        // 			LayoutFactory.reset();
        //
        // 			if (minutes !== '' && hours !== '') {
        // 				input.value = date + ' ' + hours + ':' + minutes;
        // 			} else {
        // 				input.value = date;
        // 			}
        //
        // 			document.getElementById('as-datetime-picker').remove();
        // 		})
    }
}
