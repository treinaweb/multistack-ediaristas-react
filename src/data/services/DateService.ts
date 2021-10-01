import { date } from 'yup/lib/locale';

export const DateService = {
    addHours(startTime: string, hours: number): string {
        let [hour, minute] = startTime.split(':').map(Number);
        hour = Math.min(hour + hours, 23);

        const newHour = hour.toString().padStart(2, '0'),
            newminute = minute.toString().padStart(2, '0');

        return `${newHour}:${newminute}`;
    },
    minAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date;
    },
    maxAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 100);
        return date;
    },
    getTimeFromDate(date: string): string {
        const [_day, time] = date.split('T'),
            [hours, minutes, ..._rest] = time.split(':');

        return `${hours}:${minutes}`;
    },
    transformDate(value: any, originalValue: any): any {
        if (typeof originalValue === 'string') {
            const [dia, mes, ano] = originalValue.split('/');
            if (+mes < 1 || +mes > 12) {
                return new Date('');
            }
            return new Date(+ano, +mes - 1, +dia);
        }
        return value;
    },
    getDifferenceHours(datetime: Date): number {
        const now = Date.now(),
            futureDate = datetime.getTime();

        return (futureDate - now) / 1000 / 60 / 60;
    },
};
