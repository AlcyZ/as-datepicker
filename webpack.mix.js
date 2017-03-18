const {mix} = require('laravel-mix');

mix.js('assets/js/datepicker.js', 'dist/js/datepicker.js')
	.sass('assets/sass/datepicker.scss', 'dist/css/datepicker.css')
	.options({
		processCssUrls: false
	})
	.disableNotifications();
