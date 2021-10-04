export interface PagamentoInterface {
    id: number;
    status: PagamentoStatus;
    valor: number;
    valor_deposito: number;
    created_at: string;
}

export enum PagamentoStatus {
    Pago = 1,
    Aguardando_Transferencia = 2,
}
