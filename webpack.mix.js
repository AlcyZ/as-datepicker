const {mix} = require('laravel-mix');

mix.js('assets/js/datepicker.js', 'dist/js/datepicker.js')
	.sass('assets/sass/datepicker.scss', 'dist/css/datepicker.css')
	.sass('assets/sass/pickerv2.scss', 'dist/css/pickerv2.css')
	.options({
		processCssUrls: false
	})
	.disableNotifications();
