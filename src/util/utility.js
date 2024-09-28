const formateDate = (date) => {

    const newDate = new Date(date);

    // Format the date with AM/PM
    const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Set to true for AM/PM
    };

    return newDate.toLocaleString('en-IN', options).replace(',', '');
}

export { formateDate };