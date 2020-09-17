const pad2 = (n: number): string => (n < 10 ? `0${n}` : n.toString());

const getDate = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = pad2(date.getUTCMonth() + 1); // getMonth() is zero-indexed, so we'll increment to get the correct month number
    const day = pad2(date.getUTCDate());
    const hours = pad2(date.getUTCHours() + 7);
    const minutes = pad2(date.getUTCMinutes());

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
};

const getDateIpaymu = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = pad2(date.getUTCMonth() + 1); // getMonth() is zero-indexed, so we'll increment to get the correct month number
    const day = pad2(date.getUTCDate());
    const hours = pad2(date.getUTCHours() + 7); // UTC offset for WIB => +7
    const minutes = pad2(date.getUTCMinutes());
    const seconds = pad2(date.getUTCSeconds());

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const getDateReadable = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    return `${day} ${monthNames[month]} ${year}`;
};

export { getDate, getDateIpaymu, getDateReadable };
