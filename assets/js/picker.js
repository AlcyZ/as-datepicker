import LayoutBuilder from './layout-builder';
import Events from './events';

/**
 * DESCRIPTION:
 * There are two elementary components, the layout factory and layout builder.
 *
 * The factory creates the dom nodes, add their default classes and returns them.
 * The builder connect the nodes and provide functions to access dynamic nodes.
 */

let date;

const _createLayout = () => {
	LayoutBuilder.createPicker(date);
};

const _setEvents = e => {
	Events.close();
	Events.previous(date);
	Events.next(date);
	Events.selectDate(date);
	Events.reset();
	Events.today();
	Events.submit(e.target);
	Events.hoursValidator();
	Events.minutesValidator();
	
};

export default {
	bootstrap: e => {
		date = new Date();
		_createLayout();
		_setEvents(e);
	}
}