export interface EstadoInterface {
    nome: string;
    sigla: string;
}

export interface CidadeInterface {
    codigo_ibge: number;
    cidade: string;
}

export interface CepResponse {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    cep: string;
    ibge: string;
    complemento: string;
}
