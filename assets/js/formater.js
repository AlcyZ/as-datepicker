/**
 * Copied from wikipedia (https://en.wikipedia.org/wiki/Date_format_by_country)
 *
 *  Basic components of a calendar date for the most common calendar systems:
 *  Y – year
 *  M – month
 *  D – day
 *  Order of the basic components:
 *
 *  B – big-endian (year, month, day), e.g. 1996-04-22
 *  L – little-endian (day, month, year), e.g. 22.04.96 or 22/04/96 or 22 April 1996
 *  M – middle-endian (month, day, year), e.g. 04/22/96 or April 22, 1996
 *
 *  Specific formats for the basic components:
 *  yy – two-digit year, e.g. 96
 *  yyyy – four-digit year, e.g. 1996
 *  m – one-digit month for months below 10, e.g. 4
 *  mm – two-digit month, e.g. 04
 *  mmm – three-letter abbreviation for month, e.g. Apr
 *  mmmm – month spelled out in full, e.g. April
 *  d – one-digit day for days below 10, e.g. 2
 *  dd – two-digit day, e.g. 02
 *
 *  Separators of the components:
 *  "/" – slash
 *  "." – dots or full stops
 *  "-" – hyphens or dashes
 *  " " – spaces
 *
 *  @Todo "format" argument can be whether "big-endian" or "B", "little-endian" or "L", "middle-endian" or "M".
 */

/**
 * Determines the date sequence.
 * @param format Expected format.
 * @param separator Formats separator.
 * @returns {string}
 * @private
 */
const _getSequence = (format, separator) => {
	const parts = format.split(separator);
	const validSequences = [
		'dmy', 'dym', 'mdy', 'myd', 'ymd', 'ydm'
	];
	let sequence = '';
	let i = 0;
	
	for (; i < parts.length; i++) {
		if (parts[i].indexOf('d') === 0) {
			sequence = sequence + 'd';
		}
		if (parts[i].indexOf('m') === 0) {
			sequence = sequence + 'm';
		}
		if (parts[i].indexOf('y') === 0) {
			sequence = sequence + 'y';
		}
	}
	
	if (validSequences.indexOf(sequence) === -1) {
		throw new Error('Invalid format provided. Whether the day, month or year not exists');
	}
	
	return sequence;
};

/**
 * Determines the separator of the date format.
 * @param format Expected format.
 * @returns {string}
 * @private
 */
const _getSeparator = format => {
	const validSeparators = ['/', '.', '-', ' '];
	let i = 0;
	let separator;
	
	for (; i < validSeparators.length; i++) {
		if (format.split(validSeparators[i]).length === 3) {
			separator = validSeparators[i];
		}
	}
	
	if (undefined === separator) {
		throw new Error('Invalid separator provided. Choose one of the following separators: '
			+ validSeparators.join(', '));
	}
	
	return separator;
};

/**
 * Determines the day value in the expected format.
 *
 * @param {string} format Expected format.
 * @param {Date} date Date object.
 * @param {string} separator Format separator.
 * @returns {string} Day of given date in expected format.
 * @private
 */
const _getDay = (format, date, separator) => {
	const validFormats = ['d', 'dd'];
	const dateFormat = format.split(separator);
	let i = 0;
	let j = 0;
	let dayFormat;
	for (; i < dateFormat.length; i++) {
		for (j = 0; j < validFormats.length; j++) {
			if (validFormats[j] === dateFormat[i]) {
				dayFormat = dateFormat[i];
			}
		}
	}
	if (undefined === dayFormat) {
		throw new Error('Invalid day format "' + format + '" provided.');
	}
	
	switch (dayFormat) {
		case 'd':
			return date.getDate().toString();
			break;
		case 'dd':
			let day = date.getDate();
			if (day < 10) {
				return '0' + day;
			}
			return day.toString();
			break;
	}
};

/**
 * Determines the years value in the expected format.
 *
 * @param {string} format Expected format.
 * @param {Date} date Date object.
 * @param {string} separator Format separator.
 * @returns {string} Year of given date in expected format.
 * @private
 */
const _getYear = (format, date, separator) => {
	const validFormats = ['yy', 'yyyy'];
	const dateFormat = format.split(separator);
	let i = 0;
	let j = 0;
	let yearFormat;
	for (; i < dateFormat.length; i++) {
		for (j = 0; j < validFormats.length; j++) {
			if (validFormats[j] === dateFormat[i]) {
				yearFormat = dateFormat[i];
			}
		}
	}
	if (undefined === yearFormat) {
		throw new Error('Invalid day format "' + format + '" provided.');
	}
	
	switch (yearFormat) {
		case 'yy':
			return date.getYear().toString();
			break;
		case 'yyyy':
			return date.getFullYear().toString();
			break;
	}
};

/**
 * Determines the month value in the expected format.
 *
 * @param {string} format Expected format.
 * @param {Date} date Date object.
 * @param {string} separator Format separator.
 * @returns {string} Month of given date in expected format.
 * @private
 */
const _getMonth = (format, date, separator) => {
	const validFormats = ['m', 'mm', 'mmm', 'mmmm'];
	const threeLetterAbbreviation = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'Mai',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Okt',
		'Nov',
		'Dez'
	];
	const fullMonthNames = [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	];
	const dateFormat = format.split(separator);
	let i = 0;
	let j = 0;
	let monthFormat;
	for (; i < dateFormat.length; i++) {
		for (j = 0; j < validFormats.length; j++) {
			if (validFormats[j] === dateFormat[i]) {
				monthFormat = dateFormat[i];
			}
		}
	}
	if (undefined === monthFormat) {
		throw new Error('Invalid day format "' + format + '" provided.');
	}
	
	switch (monthFormat) {
		case "m":
			return Number(date.getMonth() + 1).toString();
			break;
		case "mm":
			let monthValue = date.getMonth() + 1;
			if (monthValue < 10) {
				return '0' + monthValue;
			}
			return monthValue.toString();
			break;
		case "mmm":
			return threeLetterAbbreviation[date.getMonth()];
			break;
		case "mmmm":
			return fullMonthNames[date.getMonth()];
			break;
	}
	
};

/**
 * Returns the given date in the given format.
 * @param {string} format Expected format.
 * @param {Date} date Date to format.
 * @returns {string} Formatted date.
 */
const format = (format, date) => {
	const separator = _getSeparator(format);
	const day = _getDay(format, date, separator);
	const month = _getMonth(format, date, separator);
	const year = _getYear(format, date, separator);
	const sequence = _getSequence(format, separator);
	
	switch (sequence) {
		case 'dmy':
			return day + separator + month + separator + year;
			break;
		case 'dym':
			return day + separator + year + separator + month;
			break;
		case 'mdy':
			return month + separator + day + separator + year;
			break;
		case 'myd':
			return month + separator + year + separator + day;
			break;
		case 'ymd':
			return year + separator + month + separator + day;
			break;
		case 'ydm':
			return year + separator + day + separator + month;
			break;
	}
};

export default format;
