const CurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

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
    dateToString(date: Date, withTime = false): string {
        const time = date.toISOString();

        if (withTime) {
            return time.substring(0, 19);
        }

        return time.substring(0, 10);
    },
    getNumbersFromText(text = ''): string {
        return text.replace(/\D/g, '');
    },
    currency(price = 0): string {
        if (isNaN(price)) {
            price = 0;
        }
        return CurrencyFormatter.format(price);
    },
};
