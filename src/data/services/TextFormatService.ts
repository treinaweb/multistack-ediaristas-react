export const TextFormatService = {
    reverseDate(date: string): string {
        if (date.includes('/')) {
            return date.split('/').reverse().join('-');
        }

        if (date.includes('T')) {
            [date] = date.split('T');
        }
        return date.split('-').reverse().join('/');
    },
};
