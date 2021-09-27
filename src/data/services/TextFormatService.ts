import { EnderecoInterface } from 'data/@types/EnderecoInterface';

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
    dateTime(date = ''): string {
        const dia = TextFormatService.reverseDate(date),
            hora = date.substr(11, 5);
        return `${dia} às ${hora}`;
    },
    currency(price = 0): string {
        if (isNaN(price)) {
            price = 0;
        }
        return CurrencyFormatter.format(price);
    },
    getAddress(endereco: EnderecoInterface): string {
        let enderecoFormatado = '';
        enderecoFormatado += endereco.logradouro
            ? `${endereco.logradouro}, `
            : '';
        enderecoFormatado += endereco.numero ? `${endereco.numero} - ` : '';
        enderecoFormatado += endereco.bairro ? `${endereco.bairro}, ` : '';
        enderecoFormatado += endereco.cidade ? `${endereco.cidade} - ` : '';
        enderecoFormatado += endereco.estado ? `${endereco.estado}` : '';

        return enderecoFormatado;
    },
    formatPhoneNumber(phoneNumber: string): string {
        const match = phoneNumber.match(/^(\d{2})(\d{5})(\d{4})/);
        if (match) {
            const [_, ddd, n1, n2] = match;
            return `(${ddd}) ${n1}-${n2}`;
        }
        return phoneNumber;
    },
};
