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
    Events.previous(date);
    Events.next(date);
    Events.close();
    Events.selectDate(date);
    Events.reset();
    Events.today();

    Events.hoursValidator();
    Events.minutesValidator();

    /** Today and submit is left */
    // static event handler
    // Events.close(overlay, wrapper);
    // Events.reset();
    // Events.hoursValidator();
    // Events.minutesValidator();
    // Events.submit(e.target);

    // dynamic calls of events
    // document.querySelector('#' + LayoutFactory.getCalendarId() + ' .previous')
    // 	.addEventListener('click', e => Events.previous(e, date));
    // document.querySelector('#' + LayoutFactory.getCalendarId() + ' .next')
    // 	.addEventListener('click', e => Events.next(e, date));
};

export default {
    bootstrap: e => {
        date = new Date();
        _createLayout();
        _setEvents(e);
    }
}