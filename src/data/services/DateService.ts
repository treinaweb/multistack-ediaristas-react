export const DateService = {
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
};
