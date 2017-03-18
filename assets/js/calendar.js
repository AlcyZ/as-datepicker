import LayoutFactory from './layout-factory';

const body = document.getElementsByTagName('body')[0];

let overlay;
let wrapper;
let calendar;

const _createLayout = () => {
	overlay = LayoutFactory.createOverlay();
	wrapper = LayoutFactory.createWrapper();
	calendar = LayoutFactory.createCalendar();
	
	wrapper.appendChild(calendar);
	overlay.appendChild(wrapper);
	body.parentNode.insertBefore(overlay, body);
	
	// workaround for bg color transition effect
	setTimeout(() => overlay.style.backgroundColor = 'rgba(0,0,0,0.8)', 1);
};

const _setEvents = () => {
	
};

const _renderData = () => {
	
};

export default {
	bootstrap: function() {
		_createLayout();
		_setEvents();
		_renderData();
	}
}