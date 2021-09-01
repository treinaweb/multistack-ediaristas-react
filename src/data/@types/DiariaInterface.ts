export interface DiariaInterface {
    id?: number;
    data_atendimento: string | Date;
    hora_inicio?: string;
    hora_termino?: string;
    tempo_atendimento: number;
    preco: number;

    logradouro?: string;
    bairro: string;
    complemento: string;
    cep: string;
    cidade: string;
    estado: string;
    numero: string;
    codigo_ibge?: number;

    quantidade_quartos: number;
    quantidade_salas: number;
    quantidade_cozinhas: number;
    quantidade_banheiros: number;
    quantidade_quintais: number;
    quantidade_outros: number;

    observacoes?: string;

    servico: number;
    nome_servico: string;
}
