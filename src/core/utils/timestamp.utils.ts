const unix_ts_now_notime = () => {
	return Math.floor(+new Date(new Date().toLocaleString('fr-CA', { dateStyle: 'short' })) / 1000);
};

const unix_ts_now = () => {
	return new Date().toISOString();
};

const unix_ts_end = () => {
	const futureDate = new Date('2100-12-31T00:00:00');
	return futureDate.toISOString();
};

const convert_date_unix_ts = (date: Date) => {
	return Math.floor(+new Date(date) / 1000);
};

const convert_unix_ts_date = (timestamp: number): string => {
	return new Date(timestamp * 1000).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }).split(',')[0];
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthYearToTimeStamp = (dateStr) => {
	const [monthStr, yearStr] = dateStr.split('-');
	const monthNumeric = monthNames.indexOf(monthStr) + 1;
	const date = new Date(`${monthNumeric}-01-${yearStr}`);
	const timestamp = date.getTime();
	const timestampInSeconds = Math.floor(timestamp / 1000);
	return timestampInSeconds;
};

const timestampToMonthYear = (timestamp) => {
	const date = new Date(timestamp * 1000); // Convert to milliseconds
	const month = monthNames[date.getMonth()]; // Get the month abbreviation
	const year = date.getFullYear(); // Get the year
	return `${month}-${year}`;
};

export {
	convert_date_unix_ts,
	convert_unix_ts_date,
	monthYearToTimeStamp,
	timestampToMonthYear,
	unix_ts_end,
	unix_ts_now,
	unix_ts_now_notime,
	monthNames
};
