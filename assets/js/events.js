export default class Events {
	static closePicker(overlay, wrapper) {
		overlay.addEventListener('click', e => {
			e.target === wrapper || e.target === overlay ? overlay.remove() : null;
		});
	}
};