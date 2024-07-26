import moment from 'moment';

export const formatDate = (date: Date) => {
    return moment(date).format("MMM Do YY");
}

export const getDateDiffSeconds = (futureDate: Date, secondDate?: Date) => {
    const dateOne = moment(futureDate);
    const dateTwo = secondDate ? moment(secondDate) : moment();
    return dateOne.diff(dateTwo, "seconds");
}

export const getEndDate = (current: Date, diff: number, isMonths?: boolean) => {
    const newDate = new Date(current);
    if (isMonths) {
        return new Date(newDate.setMonth(newDate.getMonth() + diff));
    }

    return new Date(newDate.setFullYear(newDate.getFullYear() + diff));
}