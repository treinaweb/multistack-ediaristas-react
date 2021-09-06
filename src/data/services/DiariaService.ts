import { DiariaStatus, TextColor } from 'data/@types/DiariaInterface';

export const DiariaService = {
    getStatus(status: DiariaStatus): { label: string; color: TextColor } {
        let label = '',
            color: TextColor = 'success';

        switch (status) {
            case DiariaStatus.SEM_PAGAMENTO:
                label = 'Pagamento recusado';
                color = 'error';
                break;
            case DiariaStatus.PAGO:
                label = 'Paga';
                break;
            case DiariaStatus.CONFIRMADO:
                label = 'Confirmada';
                break;
            case DiariaStatus.CONCLUIDO:
                label = 'Aguardando avaliação';
                color = 'warning';
                break;
            case DiariaStatus.CANCELADO:
                label = 'Cancelada';
                color = 'error';
                break;
            case DiariaStatus.AVALIADO:
                label = 'Avaliada';
                break;
            case DiariaStatus.TRANSFERIDO:
                label = 'Finalizada';
                break;
        }

        return { label, color };
    },
};
