export function isEmail(value: string) {
	const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return emailRegexp.test(value);
}

export function parseDate(value: string) {
	// Remove all whitespaces from value, to properly parse a date
	const formatedValue = value.replace(/ /g, '');
	return new Date(formatedValue);
}

export function isDate(value: string) {
	const iso8601regexp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;
	// Remove all whitespaces from value,
	const formatedValue = value.replace(/ /g, '');

	// Check if value is matching ISO8601 datetime standard
	if (!iso8601regexp.test(formatedValue)) {
		return false;
	}

	const timestamp = parseDate(value).getTime();
	return !isNaN(timestamp);
}

export function formatDate(date: Date) {
	// Convert to ISO8601 and slice string to fit datetime-local value requirements
	return date.toISOString().slice(0, -5);
}
