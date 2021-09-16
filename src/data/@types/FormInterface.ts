import { DiariaInterface } from './DiariaInterface';
import { CidadeInterface, EnderecoInterface } from './EnderecoInterface';
import { UserInterface } from './UserInterface';

export interface NovaDiariaFormDataInterface {
    endereco: EnderecoInterface;
    faxina: DiariaInterface;
}

export interface CadastroDiaristaFormDataInterface {
    usuario: UserInterface;
    endereco: EnderecoInterface;
    enderecosAtendidos: CidadeInterface[];
}

export interface LoginFormDataInterface {
    email: string;
    password: string;
}

export interface CadastroClienteFormDataInterface {
    usuario: UserInterface;
}

export interface PagamentoFormDataInterface {
    nome_cartao: string;
    numero_cartao: string;
    codigo: string;
    validade: string;
    pagamento_recusado?: boolean;
}
