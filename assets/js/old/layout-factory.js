import Calendar from './calendar';

// Todo Object instead of class? instance not necessary at the moment ..
export default class LayoutFactory {
	createOverlay() {
		this.overlay = document.createElement('div');
		this.overlay.classList.add('overlay');
		this.overlay.setAttribute('id', 'as-datetime-picker');
		
		return this.overlay;
	}
	
	createWrapper() {
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('wrapper');
		
		return this.wrapper;
	}
	
	createPicker() {
		const calendar = new Calendar();
		let i = 0;
		
		this.picker = document.createElement('div');
		this.picker.classList.add('picker');
		
		const daysWrapper = document.createElement('div');
		daysWrapper.classList.add('days-wrapper');
		let day;
		let row;
		
		for (; i < calendar.getData().length; i++) {
			if(i % 7 === 0) {
				row = document.createElement('div');
				row.classList.add('days-row');
			}
			day = document.createElement('div');
			day.classList.add('day');
			day.innerText = calendar.getData()[i].getDate();
			row.appendChild(day);
			if(i % 7 === 6) {
				daysWrapper.appendChild(row);
			}
		}
		
		this.picker.appendChild(daysWrapper);
		
		return this.picker;
	}
}