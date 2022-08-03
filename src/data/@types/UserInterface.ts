import { ApiLinksInterface } from './ApiLinksInterface';

export interface UserInterface {
    id?: number;
    password_confirmation?: string;
    new_password?: string;
    links?: ApiLinksInterface[];
    tipo_usuario: UserType;
    password?: string;
    last_login?: Date;
    nome_completo: string;
    cpf: string;
    nascimento: string | Date;
    email: string;
    foto_usuario?: string;
    foto_documento?: string;
    telefone?: string;
    reputacao?: number;
    chave_pix: string;
    token?: {
        access: string;
        refresh: string;
    };
}

export interface UserShortInformationInterface {
    nome_completo: string;
    foto_usuario?: string;
    reputacao?: number;
    cidade: string;
}

export enum UserType {
    Cliente = 1,
    Diarista = 2,
}

export interface BuscaCepResponse {
    diaristas: UserShortInformationInterface[];
    quantidade_diaristas: number;
}
