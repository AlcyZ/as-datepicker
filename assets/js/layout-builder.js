import LayoutFactory from './layout-factory';
import Lang from './lang';

// declaration of dynamic elements
let overlay;
let wrapper;
let calendar;
let dayNameWrapper;
let month;
let day;
let year;
let days;

const _createDisplay = date => {
    const display = LayoutFactory.display();
    month = LayoutFactory.month(date);
    day = LayoutFactory.day(date);
    year = LayoutFactory.year(date);

    display.appendChild(month);
    display.appendChild(day);
    display.appendChild(year);

    return display;
};

const _createCalendar = date => {
    calendar = LayoutFactory.calendar();
    const navigation = LayoutFactory.navigation();
    const previous = LayoutFactory.previous();
    const next = LayoutFactory.next();
    const weekdayNames = LayoutFactory.weekdayNames();
    days = LayoutFactory.days(date);

    navigation.appendChild(previous);
    navigation.appendChild(next);

    calendar.appendChild(navigation);
    calendar.appendChild(weekdayNames);
    calendar.appendChild(days);

    return calendar;
};

const _createActions = () => {
    const actions = LayoutFactory.actions();
    const today = LayoutFactory.today();
    const reset = LayoutFactory.reset();
    const submit = LayoutFactory.submit();

    actions.appendChild(today);
    actions.appendChild(reset);
    actions.appendChild(submit);

    return actions;
};

const _createPicker = date => {
    const body = document.getElementsByTagName('body')[0];
    overlay = LayoutFactory.overlay();
    wrapper = LayoutFactory.wrapper();
    const calendarWrapper = LayoutFactory.calendarWrapper();

    dayNameWrapper = LayoutFactory.dayNameWrapper(date);
    const display = _createDisplay(date);
    const calendar = _createCalendar(date);
    const timePicker = LayoutFactory.timePicker();
    const actions = _createActions();

    calendarWrapper.appendChild(dayNameWrapper);
    calendarWrapper.appendChild(display);
    calendarWrapper.appendChild(calendar);
    calendarWrapper.appendChild(timePicker);
    calendarWrapper.appendChild(actions);
    wrapper.appendChild(calendarWrapper);
    overlay.appendChild(wrapper);

    body.insertBefore(overlay, body.firstChild);
};

export default {
    createPicker: _createPicker,

    renderDays: date => {
        days.remove();
        days = LayoutFactory.days(date);
        calendar.appendChild(days);
    },

    updateDisplay: date => {
        dayNameWrapper.innerText = Lang.weekdays[date.getDay()];
        month.innerText = Lang.months[date.getMonth()];
        day.innerText = date.getDate();
        year.innerText = date.getFullYear();
    },

    reset: () => {
        dayNameWrapper.innerText = '';
        month.innerText = '';
        day.innerText = '';
        year.innerText = '';
    },

    today: () => {
        const date = new Date();
        dayNameWrapper.innerText = Lang.weekdays[date.getDay()];
        month.innerText = Lang.months[date.getMonth()];
        day.innerText = date.getDate();
        year.innerText = date.getFullYear();
    },

    getOverlay: () => {
        return overlay;
    },
    getWrapper: () => {
        return wrapper;
    },
    getDayNameWrapper: () => {
        return dayNameWrapper;
    },
    getMonth: () => {
        return month;
    },
    getDay: () => {
        return day;
    },
    getYear: () => {
        return year;
    },
    getDays: () => {
        return days;
    }
}
