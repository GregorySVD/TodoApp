function addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value+'';
}

export function getCurrentFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = addLeadingZero(currentDate.getMonth() + 1);
    const day = addLeadingZero(currentDate.getDate());
    const hours = addLeadingZero(currentDate.getHours());
    const minutes = addLeadingZero(currentDate.getMinutes());
    const seconds = addLeadingZero(currentDate.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}
