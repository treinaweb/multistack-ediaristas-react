export interface EnderecoInterface {
    id?: number;
    logradouro?: string;
    bairro: string;
    complemento: string;
    cep: string;
    cidade: string;
    estado: string;
    numero: string;
    codigo_ibge?: number;
}

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
    ibge: number;
    complemento: string;
}
