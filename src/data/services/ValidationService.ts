export const ValidationService = {
    cep(cep = ''): boolean {
        return cep.replace(/\D/g, '').length === 8;
    },
    telefone(telefone = ''): boolean {
        return telefone.replace(/\D/g, '').length === 11;
    },
    cpf(cpf = ''): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos
        if (
            cpf.length != 11 ||
            cpf == '00000000000' ||
            cpf == '11111111111' ||
            cpf == '22222222222' ||
            cpf == '33333333333' ||
            cpf == '44444444444' ||
            cpf == '55555555555' ||
            cpf == '66666666666' ||
            cpf == '77777777777' ||
            cpf == '88888888888' ||
            cpf == '99999999999'
        )
            return false;
        // Valida 1o digito
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
        return true;
    },
    hora(horario = ''): boolean {
        return /^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(horario);
    },
    horarioDeAgendamento(data: string, hora: string): boolean {
        const agora = Date.now(),
            dataHora = new Date(data + 'T' + hora).getTime(),
            diferenca = (dataHora - agora) / 1000 / 60 / 60,
            minHoras = 48;

        return diferenca > minHoras;
    },
};
