export type FormValues = {
    usuario: {
        email: string;
        nome_completo: string;
        nascimento: string;
        cpf: string;
        telefone: string;
        password: string;
        password_confirmation: string;
        new_password?: string;
    };

    pagamento_recusado: {
        string?: string;
    };

    pagamento: {
        numero_cartao: string;
        nome_cartao: string;
        validade: string;
        codigo: string;
    };

    endereco: {
        cep: string;
        bairro: string;
        estado: string;
        cidade: string;
        logradouro: string;
        numero: string;
        complemento: string;
        codigo_ibge: number;
    };

    login: {
        email: string;
        password: string;
    };

    faxina: {
        data_atendimento: string;
        hora_inicio: string;
        hora_termino: string;
        observacoes: string;
        servico: string;

       
    };
};
