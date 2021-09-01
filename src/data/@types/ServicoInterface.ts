export interface ServicoInterface {
    id: number;
    nome: string;
    icone: string;
    horas_banheiro: number;
    horas_cozinha: number;
    horas_outros: number;
    horas_quarto: number;
    horas_quintal: number;
    horas_sala: number;
    porcentagem_comissao: number;
    qtd_horas: number;
    valor_banheiro: number;
    valor_cozinha: number;
    valor_minimo: number;
    valor_outros: number;
    valor_quarto: number;
    valor_quintal: number;
    valor_sala: number;
}
