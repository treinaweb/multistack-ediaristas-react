import { ApiLinksInterface } from './ApiLinksInterface';
import { AvaliacaoUsuarioInterface } from './AvaliacaoUsuarioInterface';
import { UserInterface } from './UserInterface';

export interface Oportunidade {
    id?: number;
    data_atendimento: string | Date;
    tempo_atendimento: number;
    status: number;
    preco: number;
    valor_comissao: number;
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
    motivo_cancelamento?: string;
    created_at?: Date;
    updated_at?: Date;
    cliente: UserInterface;
    diarista?: UserInterface;
    servico: number;
    nome_servico: string;
    candidatas?: Array<number>;
    links: ApiLinksInterface[];
    avaliacoes_cliente: AvaliacaoUsuarioInterface[];
}
