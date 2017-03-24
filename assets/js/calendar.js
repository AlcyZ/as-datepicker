import LayoutFactory from './layout-factory';
import Events from './events';

const body = document.getElementsByTagName('body')[0];
const date = new Date();

let overlay;
let wrapper;
let calendar;

/**
 * Creates the calendar layout.
 * @private
 */
const _createLayout = () => {
	overlay = LayoutFactory.createOverlay();
	wrapper = LayoutFactory.createWrapper();
	calendar = LayoutFactory.createCalendar(date);
	
	wrapper.appendChild(calendar);
	overlay.appendChild(wrapper);
	body.parentNode.insertBefore(overlay, body);
	
	// workaround for bg color transition effect
	setTimeout(() => overlay.style.backgroundColor = 'rgba(0,0,0,0.8)', 1);
};

/**
 * Sets event listener for calendar events.
 * @private
 */
const _setEvents = e => {
	// static event handler
	Events.close(overlay, wrapper);
	Events.reset();
	Events.selectDate(date);
	Events.hoursValidator();
	Events.minutesValidator();
	Events.submit(e.target);
	
	// dynamic calls of events
	document.querySelector('.previous').addEventListener('click', e => Events.previous(e, date));
	document.querySelector('.next').addEventListener('click', e => Events.next(e, date));
};

export default {
	bootstrap: e => {
		_createLayout();
		_setEvents(e);
	}
}