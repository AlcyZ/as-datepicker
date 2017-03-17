import Events from './events';
import LayoutFactory from './layout-factory';

export default {
	open: function() {
		const layoutFactory = new LayoutFactory();
		const body = document.getElementsByTagName('body')[0];
		const overlay = layoutFactory.createOverlay();
		const wrapper = layoutFactory.createWrapper();
		const picker = layoutFactory.createPicker();
		
		// connect elements
		wrapper.appendChild(picker);
		overlay.appendChild(wrapper);
		body.parentNode.insertBefore(overlay, body);
		
		// set events (maybe before connecting elements)
		Events.closePicker(overlay, wrapper);
		
		setTimeout(() => overlay.style.backgroundColor = 'rgba(0,0,0,0.8)', 1);
	}
}